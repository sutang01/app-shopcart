import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppColors from "@/constants/Colors";
import HomeHeader from "@/components/HomeHeader";
import { useEffect, useState } from "react";
import { Product } from "@/type";
import { useProductStore } from "@/store/productStore";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const {
    products,
    categories,
    loading,
    error,
    fetchProducts,
    fetchCategories,
  } = useProductStore();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [products]);

  useEffect(() => {
    if (products.length > 0) {
      const reversedProducts = [...products].reverse();
      setFeaturedProducts(reversedProducts as Product[]);
    }
  }, [products]);

  const navigateToCategory = (category: string) => {
    router.push({
      pathname: "/(tabs)/shop",
      params: {
        category: category,
      },
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <LoadingSpinner fullScreen />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <View style={styles.wrapper}>
      <HomeHeader />
      <View style={styles.contentContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainerView}
        >
          <View style={styles.categoriesSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Categories</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={styles.categoryButton}
                  onPress={() => navigateToCategory(category)}
                >
                 <AntDesign name="tag" size={16} color={AppColors.primary[500]} />
                 <Text style={styles.categoryText}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                 </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Featured Products</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: AppColors.background.primary,
  },
  contentContainer: {
    // paddingHorizontal: 20,
    paddingLeft: 20,
  },
  scrollContainerView: {
    paddingBottom: 300,
  },
  container: {
    flex: 1,
    backgroundColor: AppColors.background.primary,
  },
  title: {
    fontFamily: "Inter-Bold",
    fontSize: 28,
    color: "white",
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingRight: 20,
  },
  sectionTitle: {
    fontFamily: "Inter-SemiBold",
    fontSize: 18,
    color: AppColors.text.primary,
  },
  seeAllText: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
    color: AppColors.primary[500],
  },
  categoriesSection: {
    marginTop: 10,
    marginBottom: 16,
  },

  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: AppColors.background.secondary,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    minWidth: 100,
    marginLeft: 5,
  },
  categoryText: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
    color: AppColors.text.primary,
    marginLeft: 8,
  },
  featuredSection: {
    marginVertical: 16,
  },
  feadturedProductsContainer: {},
  featuredProductContainer: {
    marginHorizontal: 8,
  },
  newestSection: {
    marginVertical: 16,
    marginBottom: 32,
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productContainer: {
    width: "48%",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  errorText: {
    color: AppColors.error,
    fontFamily: "Inter-Medium",
    fontSize: 16,
    textAlign: "center",
  },
});
