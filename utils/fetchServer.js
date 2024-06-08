export default async function fetchServer(arg) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${arg}`, {
            cache: "no-store",
        });

        
  
        if (!response.ok) {
            throw new Error("Failed to fetch");
        }
  
        const data = await response.json();
    
        // Check if the data is valid
        if (!data || typeof data !== 'object') {
          throw new Error('Invalid data received');
        }
    
        return data;
  
    } catch (error) {
        console.error('Fetch error:', error.message);
        // Return a fallback value or handle the error as necessary
        return null; // or { error: error.message } or a default data object
    }
};