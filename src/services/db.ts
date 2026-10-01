import Dexie, { type EntityTable } from 'dexie';

export interface ScanRecord {
  id?: number;
  imageBlob: string; // Base64 string of the image
  diseaseName: string;
  confidence: number;
  treatment: string;
  scannedAt: number;
  synced: boolean;
  cloudId?: string; // ID returned from the server after syncing
}

export const db = new Dexie('AgriScanDB') as Dexie & {
  scans: EntityTable<ScanRecord, 'id'>;
};

// Define schema
db.version(1).stores({
  scans: '++id, diseaseName, scannedAt, synced'
});

export const saveScan = async (
  imageBlob: string,
  diseaseName: string,
  confidence: number,
  treatment: string
) => {
  return await db.scans.add({
    imageBlob,
    diseaseName,
    confidence,
    treatment,
    scannedAt: Date.now(),
    synced: false,
  });
};

export const markScanSynced = async (localId: number, cloudId: string) => {
  await db.scans.update(localId, {
    synced: true,
    cloudId
  });
};
