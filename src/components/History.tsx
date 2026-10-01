import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../services/db';
import { XIcon, UploadCloudIcon, CheckCircleIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export function History({ onClose }: { onClose: () => void }) {
  const scans = useLiveQuery(() => db.scans.orderBy('scannedAt').reverse().toArray());
  const { user } = useAuth();
  const [syncing, setSyncing] = React.useState(false);

  const syncScans = async () => {
    if (!user) {
      toast.error('Please log in to sync scans');
      return;
    }

    const unsyncedScans = await db.scans.where('synced').equals(0).toArray();

    if (unsyncedScans.length === 0) {
      toast.success('All scans are already synced!');
      return;
    }

    setSyncing(true);
    try {
      const response = await fetch('/api/scans/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ scans: unsyncedScans })
      });

      if (!response.ok) {
        throw new Error('Failed to sync');
      }

      const results = await response.json();

      // Update local db with cloud IDs and synced status
      for (const result of results.synced) {
        if (result.localId && result.cloudId) {
          await db.scans.update(result.localId, {
            synced: true,
            cloudId: result.cloudId
          });
        }
      }

      toast.success(`Successfully synced ${results.synced.length} scans!`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to sync scans. Try again when online.');
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Scan History</h2>
          <div className="flex gap-4">
            <button
              onClick={syncScans}
              disabled={syncing || !user}
              className="flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-xl font-semibold hover:bg-emerald-200 transition-colors disabled:opacity-50"
            >
              <UploadCloudIcon className="w-5 h-5" />
              {syncing ? 'Syncing...' : 'Sync to Cloud'}
            </button>
            <button
              onClick={onClose}
              className="p-2 bg-gray-100 rounded-full text-gray-500 hover:text-gray-900 transition-colors"
            >
              <XIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {!user && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl mb-8">
            Please log in to sync your local scan history to the cloud.
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {scans?.map((scan) => (
            <div key={scan.id} className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 flex gap-4">
              <img src={scan.imageBlob} alt="Scan" className="w-24 h-24 object-cover rounded-xl" />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-gray-900">{scan.diseaseName}</h3>
                  {scan.synced && (
                    <div title="Synced to cloud">
                      <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(scan.scannedAt).toLocaleDateString()}
                </p>
                <div className="text-sm bg-gray-50 p-2 rounded-lg line-clamp-2">
                  {scan.treatment}
                </div>
              </div>
            </div>
          ))}

          {scans?.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-12">
              No scans yet. Start scanning crops to see your history here!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
