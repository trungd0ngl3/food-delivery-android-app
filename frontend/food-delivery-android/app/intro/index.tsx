import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from "react-native";

const slides = [
  {
    id: "1",
    title: "All your favorites",
    description:
      "Get all your favorite food in one place, you just place the order we do the rest",
    image: require("../../src/assets/images/intro/intro1.png"),
  },
  {
    id: "2",
    title: "Order from chosen chef",
    description:
      "Get all your favorite food in one place, you just place the order we do the rest",
    image: require("../../src/assets/images/intro/intro2.png"),
  },
  {
    id: "3",
    title: "Free delivery offers",
    description:
      "Get all your favorite food in one place, you just place the order we do the rest",
    image: require("../../src/assets/images/intro/intro3.png"),
  },
];

export default function IntroScreen() {
  const { width, height } = useWindowDimensions();
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: any[] }) => {
      if (viewableItems[0]?.index != null) {
        setCurrentIndex(viewableItems[0].index);
      }
    }
  ).current;

  const viewConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      router.replace("/auth");
    }
  };

  const handleSkip = () => {
    router.replace("/auth");
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>

            <Image
              source={item.image}
              style={[
                styles.image,
                {
                  width: width * 0.8,
                  height: height * 0.4,
                },
              ]}
            />
          </View>
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfig}
      />

      {/* DOTS */}
      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
      </View>

      {/* BUTTONS */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
          <Text style={styles.nextText}>
            {currentIndex === slides.length - 1 ? "Get Started" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  slide: {
    flex: 1,
    alignItems: "center",
  },

  textContainer: {
    marginTop: 80,
    paddingHorizontal: 32,
    alignItems: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "600",
    marginBottom: 12,
    color: "#181C2E",
    textAlign: "center",
  },

  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },

  image: {
    resizeMode: "contain",
    marginTop: 40,
  },

  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 6,
  },

  activeDot: {
    backgroundColor: "#FF7622",
    width: 16,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    marginBottom: 40,
  },

  skip: {
    fontSize: 16,
    color: "#999",
  },

  nextButton: {
    backgroundColor: "#FF7622",
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 24,
  },

  nextText: {
    color: "#fff",
    fontSize: 16,
  },
});
