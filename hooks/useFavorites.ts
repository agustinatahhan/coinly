import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";

const FAVORITES_KEY = "FAVORITE_COINS";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadFavorites = async () => {
        try {
          const stored = await AsyncStorage.getItem(FAVORITES_KEY);
          if (stored && isActive) {
            setFavorites(JSON.parse(stored));
          } else if (isActive) {
            setFavorites([]);
          }
        } catch (error) {
          console.error("Error loading favorites", error);
        }
      };

      loadFavorites();

      return () => {
        isActive = false;
      };
    }, [])
  );

  const toggleFavorite = async (coinId: string) => {
    let updated: string[] = [];

    if (favorites.includes(coinId)) {
      updated = favorites.filter((id) => id !== coinId);
    } else {
      updated = [...favorites, coinId];
    }

    setFavorites(updated);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  };

  const isFavorite = (coinId: string) => favorites.includes(coinId);

  return { favorites, toggleFavorite, isFavorite };
};
