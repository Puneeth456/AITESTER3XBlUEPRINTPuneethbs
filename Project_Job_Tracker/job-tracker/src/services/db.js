import { openDB } from 'idb';

const DB_NAME = 'job-tracker';
const DB_VERSION = 1;
const STORE_NAME = 'jobs';

let dbPromise;

export function getDb() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, {
            keyPath: 'id',
            autoIncrement: true,
          });
          store.createIndex('status', 'status', { unique: false });
          store.createIndex('company', 'company', { unique: false });
        }
      },
    });
  }
  return dbPromise;
}

export async function getAllJobs() {
  const db = await getDb();
  return db.getAll(STORE_NAME);
}

export async function addJob(job) {
  const db = await getDb();
  return db.add(STORE_NAME, { ...job, createdAt: Date.now() });
}

export async function updateJob(job) {
  const db = await getDb();
  return db.put(STORE_NAME, job);
}

export async function deleteJob(id) {
  const db = await getDb();
  return db.delete(STORE_NAME, id);
}

export async function getResumeNames() {
  const jobs = await getAllJobs();
  const resumes = jobs
    .map((j) => j.resumeUsed)
    .filter(Boolean)
    .filter((v, i, a) => a.indexOf(v) === i);
  return resumes;
}
