// To run this test:
// cd back-end
// node scripts/testAI.js

import fetch from 'node-fetch'; // if node 18+, native fetch is available

async function testPlanner() {
  console.log("✈️ Sending request to the Hybrid AI Planner...");
  
  try {
    const res = await fetch("http://localhost:5000/api/ai/planner", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        days: 2,
        regions: ["Jhansi", "Orchha"],
        preferences: "Budget stays, nearby food places, historical sites"
      })
    });

    const data = await res.json();
    console.log("✅ Response Status:", res.status);
    console.log("✅ Returned Data:\n", JSON.stringify(data, null, 2));

  } catch (error) {
    console.error("❌ Test Failed:", error);
  }
}

testPlanner();
