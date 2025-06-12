import { processChatMessage } from './utils/chatProcessor';

// Test some example queries
const testQueries = [
    "Hello!",
    "What's the best time to visit Cameroon?",
    "Tell me about the beaches",
    "How much does it cost to visit?",
    "What languages do they speak?",
    "Is it safe to travel there?"
];

// Run the tests
console.log("Testing Chat Processor:\n");
testQueries.forEach(query => {
    console.log(`Query: "${query}"`);
    console.log(`Response: ${processChatMessage(query)}\n`);
}); 