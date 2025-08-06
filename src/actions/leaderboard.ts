"use server";

import {
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { app } from "@/lib/firebase";

export interface Score {
  rank?: number;
  name: string;
  score: number;
  country: string;
  avatar?: string;
}

export async function getLeaderboardScores(): Promise<Score[]> {
  const db = getFirestore(app);
  const scoresCol = collection(db, "scores");
  const q = query(scoresCol, orderBy("score", "desc"), limit(10));

  try {
    const querySnapshot = await getDocs(q);
    const scores: Score[] = [];
    let rank = 1;
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      scores.push({
        rank: rank++,
        name: data.name,
        score: data.score,
        country: data.country || "🏳️", // Default flag
        avatar: `https://placehold.co/40x40?text=${data.name.charAt(0)}`
      });
    });
    return scores;
  } catch (error) {
    console.error("Error fetching leaderboard scores:", error);
    return []; // Return empty array on error
  }
}
