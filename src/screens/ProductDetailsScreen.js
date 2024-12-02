import {
  StyleSheet,
  View,
  Image,
  FlatList,
  useWindowDimensions,
  Text,
  ScrollView,
  Pressable,
} from "react-native";
import products from "../data/products";
import { useSelector, useDispatch } from "react-redux";
import { cartSlice } from "../store/cartSlice";
import { useState } from "react"; // Import useState

const ProductDetailsScreen = () => {
  const product = useSelector((state) => state.products.selectedProduct);
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();

  // State to manage button color and message
  const [buttonColor, setButtonColor] = useState("black");
  const [message, setMessage] = useState("");

  function addToCart() {
    dispatch(cartSlice.actions.addCartItem({ product }));
    setButtonColor("green"); // Change button color
    setMessage("Product added to cart!"); // Set message
  }

  return (
    <View>
      <ScrollView>
        {/* Image Carousel */}
        <FlatList
          data={product.images}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={{ width, aspectRatio: 1 }} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />

        <View style={{ padding: 20 }}>
          {/* Title */}
          <Text style={styles.title}>{product.name}</Text>

          {/* Price */}
          <Text style={styles.price}>$ {product.price}</Text>

          {/* Description */}
          <Text style={styles.description}>{product.description}</Text>

          {/* Message display */}
          {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
      </ScrollView>

      {/* Add to cart button */}
      <Pressable onPress={addToCart} style={[styles.button, { backgroundColor: buttonColor }]}>
        <Text style={styles.buttonText}>Add To Cart</Text>
      </Pressable>

      {/* Navigation icon */}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    fontWeight: "500",
    marginVertical: 10,
  },
  price: {
    fontWeight: "500",
    fontSize: 16,
    letterSpacing: 1.5,
  },
  description: {
    marginVertical: 10,
    fontSize: 18,
    lineHeight: 30,
    fontWeight: 300,
  },
  button: {
    position: "absolute",
    bottom: 30,
    width: "90%",
    alignSelf: "center",
    padding: 20,
    borderRadius: 100,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: 500,
    fontSize: 16,
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    color: "green",
    fontWeight: "bold",
  },
});

export default ProductDetailsScreen;