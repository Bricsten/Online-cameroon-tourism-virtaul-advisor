// This is a simple mock of an AI chat processor
// In a real application, this would connect to an actual AI backend

export function processChatMessage(message: string): string {
  // Convert message to lowercase for easier matching
  const lowerMessage = message.toLowerCase();
  
  // Check for greetings
  if (containsAnyWord(lowerMessage, ['hello', 'hi', 'hey', 'greetings', 'bonjour'])) {
    return "Hello! I'm your CamTourVisor. How can I help you plan your visit to Cameroon today?";
  }
  
  // Check for destination questions
  if (containsAllWords(lowerMessage, ['best', 'time', 'visit'])) {
    return "The best time to visit Cameroon depends on the region and your interests. Generally, the dry seasons (November to February and June to August) are ideal for most tourist activities. The northern regions are best visited during the cooler months (October to April), while coastal areas like Kribi and Limbe can be enjoyed year-round, with slightly less rainfall from November to February.";
  }
  
  if (containsAnyWord(lowerMessage, ['beach', 'beaches', 'coast', 'ocean', 'sea']) || containsAllWords(lowerMessage, ['kribi'])) {
    return "Cameroon has beautiful beaches along its Atlantic coastline. The most popular beach destination is Kribi, known for its golden sand beaches and the unique Lobé Waterfalls that flow directly into the ocean. Limbe also offers volcanic black sand beaches with views of Mount Cameroon. Both offer fresh seafood, water activities, and cultural experiences. The best time to visit is during the dry season (November to February). Accommodations range from 15,000 to 100,000 XAF per night depending on your preferences.";
  }
  
  if (containsAnyWord(lowerMessage, ['mountain', 'mount', 'climbing', 'hiking', 'trekking']) || containsAllWords(lowerMessage, ['cameroon', 'mount'])) {
    return "Mount Cameroon (4,040m) is West Africa's highest peak and an active volcano located near Buea. There are several trekking routes ranging from 1-3 days, suitable for different experience levels. The best time to climb is during the dry season (November to February or June to August). A 2-day trek costs around 80,000-150,000 XAF including guides, porters, and park fees. You'll need good hiking boots, warm clothing for the summit, and rain gear. Guided tours are mandatory for safety reasons.\n\nIn French: 'Le Mont Cameroun est le point culminant de l'Afrique de l'Ouest et un volcan actif.'";
  }
  
  if (containsAllWords(lowerMessage, ['yaounde']) || containsAllWords(lowerMessage, ['yaoundé'])) {
    return "Yaoundé, the capital city of Cameroon, is known as the 'city of seven hills.' Top attractions include the National Museum, the Reunification Monument, Mefou National Park, and the Notre Dame Cathedral. I recommend spending 2-3 days to fully explore the city. Accommodation costs range from 15,000 to 80,000 XAF per night. The city has a pleasant climate year-round due to its elevation, with temperatures averaging 24°C. You can get around using taxis (starting at 500 XAF for shared taxis) or motorcycle taxis called 'benskins' (300-500 XAF for short trips).";
  }
  
  if (containsAnyWord(lowerMessage, ['wildlife', 'animals', 'safari', 'park']) || containsAllWords(lowerMessage, ['waza'])) {
    return "Waza National Park in the Far North region is Cameroon's most famous wildlife reserve. It's home to elephants, lions, giraffes, antelopes, and numerous bird species. The best time to visit is during the dry season (November to April) when animals gather around water sources. A safari typically costs 50,000-100,000 XAF per day including guide fees. Other notable wildlife destinations include Lobéké National Park for gorilla tracking and Korup National Park for primates and rare bird species.";
  }
  
  if (containsAnyWord(lowerMessage, ['culture', 'tradition', 'history', 'heritage', 'museum'])) {
    return "Cameroon is known as 'Africa in miniature' due to its cultural diversity with over 250 ethnic groups. Cultural highlights include the Bafut Palace (home of the Fon of Bafut), the Sultanate of Foumban with its palace museum, and the Baka Pygmy communities in the east. Traditional festivals occur year-round, with the most spectacular being the Ngondo Festival (Douala, December) and Nyem-Nyem Festival (Adamawa, April). The National Museum in Yaoundé displays artifacts from across the country. Many communities welcome visitors, but always show respect by asking permission before taking photos and following local customs.";
  }
  
  if (containsAllWords(lowerMessage, ['how', 'many', 'days']) || containsAnyWord(lowerMessage, ['itinerary', 'plan', 'schedule'])) {
    return "For a comprehensive Cameroon experience, I recommend 10-14 days. Here's a sample itinerary:\n\n- Days 1-2: Yaoundé (capital city, museums, culture)\n- Days 3-5: Kribi (beaches, waterfalls, coastal life)\n- Days 6-8: Limbe & Buea (botanical garden, wildlife center, Mount Cameroon)\n- Days 9-10: Bamenda & Bafut (grassfields culture, traditional palaces)\n\nIf you have less time, focus on one region - either the coastal areas (Douala, Kribi, Limbe) or the western highlands (Bamenda, Bafut, Foumban). For specific interests like wildlife or culture, I can suggest more targeted itineraries.";
  }
  
  if (containsAnyWord(lowerMessage, ['cost', 'budget', 'expensive', 'cheap', 'price', 'money'])) {
    return "Cameroon can be enjoyed on various budgets. Here's a rough cost breakdown (in XAF):\n\n- Budget: 25,000-40,000 per day\n  • Accommodation: 10,000-15,000 in guesthouses\n  • Meals: 1,500-3,000 at local restaurants\n  • Transportation: 3,000-5,000 for shared taxis\n\n- Mid-range: 40,000-80,000 per day\n  • Accommodation: 20,000-40,000 in 3-star hotels\n  • Meals: 3,000-8,000 at good restaurants\n  • Transportation: 10,000-15,000 for private taxis\n\n- Luxury: 80,000+ per day\n  • Accommodation: 50,000+ in 4-5 star hotels\n  • Meals: 10,000+ at top restaurants\n  • Transportation: 30,000+ for private drivers\n\nAdditional costs include park fees (5,000-15,000), guided tours (20,000-50,000), and souvenirs.";
  }
  
  if (containsAnyWord(lowerMessage, ['food', 'eat', 'cuisine', 'dish', 'restaurant'])) {
    return "Cameroonian cuisine is diverse and flavorful. Must-try dishes include:\n\n- Ndolé: The national dish made with bitter leaves, nuts, and fish or beef\n- Poulet DG (Directeur Général): Chicken with plantains in a spicy sauce\n- Eru: A nutritious vegetable soup with meat and waterleaf\n- Koki: Steamed bean pudding wrapped in banana leaves\n- Pepper soup: Spicy meat or fish soup with intense flavors\n- Brochettes: Grilled meat skewers found at street stalls\n\nIn major cities, meals at local restaurants cost 1,500-5,000 XAF. Street food is cheaper and often delicious. For drinks, try palm wine (mímbo), 33 Export beer, and Tangui mineral water. French is helpful for reading menus, though many places have pictures or English translations.";
  }
  
  if (containsAnyWord(lowerMessage, ['transport', 'transportation', 'travel', 'car', 'bus', 'taxi'])) {
    return "Getting around Cameroon:\n\n- Between cities: Intercity buses (2,000-10,000 XAF depending on distance) or shared taxis (slightly more expensive but faster)\n- Within cities: Shared taxis (300-500 XAF per trip), motorcycle taxis called 'benskins' (200-500 XAF for short trips), or private taxis (negotiate before boarding, typically 1,000-3,000 XAF)\n- Car rental: Available in major cities (40,000-60,000 XAF per day, international license required)\n\nTravel times: Yaoundé to Douala (3-4 hours), Yaoundé to Kribi (4-5 hours), Douala to Limbe (1-2 hours). Roads vary in quality; major highways are generally good, but secondary roads may be challenging, especially during the rainy season.";
  }
  
  if (containsAnyWord(lowerMessage, ['language', 'speak', 'communication', 'french', 'english'])) {
    return "Cameroon is officially bilingual with French and English as official languages. French is more widely spoken (about 70% of the population), while English is common in the Northwest and Southwest regions. Additionally, there are over 250 local languages!\n\nUseful French phrases:\n- Hello: Bonjour (bohn-zhoor)\n- Thank you: Merci (mehr-see)\n- How much?: C'est combien? (say kom-bee-yan)\n- Where is...?: Où est...? (oo eh)\n\nUseful English Pidgin phrases:\n- Hello: How di body?\n- Thank you: Thank you plenty\n- How much?: How much?\n- Where is...?: Weti side...?\n\nIn tourist areas, you'll find people who speak basic English, but learning a few French phrases is highly recommended.";
  }
  
  if (containsAnyWord(lowerMessage, ['safety', 'safe', 'danger', 'security'])) {
    return "Cameroon is generally safe for tourists in the main travel areas, but like any destination, awareness is important. The major tourist destinations like Kribi, Limbe, Yaoundé (central areas), and Douala (central areas) are considered safe for visitors.\n\nTravel advisories recommend avoiding the Far North region (except Waza with proper guides), the Northwest and Southwest regions, and border areas with Nigeria, Central African Republic, and Chad.\n\nPractical safety tips:\n- Keep valuables secure and be discreet with expensive items\n- Use reputable taxi services, especially at night\n- Carry photocopies of your passport and keep the original in a hotel safe\n- Get yellow fever vaccination (required) and take malaria precautions\n- Drink bottled or purified water\n\nIt's advisable to check your country's latest travel advisories before planning your trip.";
  }
  
  if (containsAnyWord(lowerMessage, ['accommodation', 'hotel', 'stay', 'lodge', 'hostel'])) {
    return "Accommodation options in Cameroon range from international hotels to local guesthouses:\n\n- Budget (10,000-20,000 XAF): Simple guesthouses and hostels with basic amenities\n- Mid-range (20,000-50,000 XAF): 3-star hotels with reliable services and amenities\n- Luxury (50,000+ XAF): 4-5 star international hotels mainly in Yaoundé and Douala\n\nIn major tourist areas like Kribi and Limbe, beachfront hotels are available at various price points. In national parks, accommodation options include lodges and tented camps.\n\nIt's advisable to book in advance for high-end hotels and during peak tourist seasons. Many smaller establishments may not have online booking, so contacting them directly by phone is recommended. Most hotels accept cash payment in XAF, and higher-end properties accept credit cards.";
  }
  
  // Handle unrelated queries
  if (containsAnyWord(lowerMessage, ['bitcoin', 'crypto', 'stock', 'invest', 'forex', 'programming', 'coding'])) {
    return "I specialize in helping with tourism-related queries about Cameroon. For information on other topics, please consult a general knowledge assistant or appropriate expert.";
  }
  
  // Default response
  return "Thank you for your interest in Cameroon travel! I'd be happy to provide information about attractions, accommodations, transportation, local customs, or help you plan an itinerary. Could you please specify what aspect of Cameroon travel you'd like to learn more about?";
}

function containsAnyWord(text: string, words: string[]): boolean {
  return words.some(word => text.includes(word));
}

function containsAllWords(text: string, words: string[]): boolean {
  return words.every(word => text.includes(word));
}