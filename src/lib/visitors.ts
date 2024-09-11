export function getVisitorId() {
  let visitorId = localStorage.getItem('visitorId');
  if (!visitorId) {
    // Generate a new UUID if none exists
    visitorId = crypto.randomUUID();
    localStorage.setItem('visitorId', visitorId);
  }
  return visitorId;
}

