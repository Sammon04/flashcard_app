//This is just so if the url to use backend scripts changes, we only have to change it in .env
export const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost/flashcard_app/backend/api';