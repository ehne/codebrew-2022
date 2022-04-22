import PouchDB from 'pouchdb';

const checkExpiry = async () => {
  const db = new PouchDB('local');
  const allDocs = await db.allDocs({include_docs: true});

  // i am wildly confused by the web notifications APIs
}


self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'checkExpiry') {
    console.log('Checking expiry dates now');
    event.waitUntil(checkExpiry());
  }
});