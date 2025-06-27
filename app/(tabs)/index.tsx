import { StyleSheet, View } from 'react-native';
import AppColors from '@/constants/Colors';
import HomeHeader from '@/components/HomeHeader';

export default function HomeScreen() {
  return (
    <View style={styles.wrapper}>
      <HomeHeader />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: AppColors.background.primary,
  },
});

