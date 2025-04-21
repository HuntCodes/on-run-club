import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Add type definitions for require
declare function require(path: string): any;

type NavigationProps = StackNavigationProp<ParamListBase>;

interface Coach {
  id: number;
  name: string;
  philosophy: string;
  traits: string[];
  image: any;
}

interface CoachSelectionScreenProps {
  route?: {
    params?: {
      error?: string;
    };
  };
}

const mockCoaches: Coach[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    philosophy: "Building strength through consistency",
    traits: ["Motivating", "Technical", "Patient"],
    image: require('../../assets/coach-placeholder.png')
  },
  {
    id: 2,
    name: "Mike Thompson",
    philosophy: "Balance is key to long-term success",
    traits: ["Experienced", "Holistic", "Supportive"],
    image: require('../../assets/coach-placeholder.png')
  },
  {
    id: 3,
    name: "Lisa Chen",
    philosophy: "Personalized approach for every runner",
    traits: ["Analytical", "Adaptable", "Encouraging"],
    image: require('../../assets/coach-placeholder.png')
  }
];

interface CoachCardProps {
  coach: Coach;
  selected: boolean;
  onSelect: () => void;
}

const CoachCard = ({ coach, selected, onSelect }: CoachCardProps) => (
  <TouchableOpacity 
    style={[styles.coachCard, selected && styles.selectedCard]} 
    onPress={onSelect}
    accessibilityRole="button"
    accessibilityLabel={`Select coach ${coach.name}`}
  >
    <Image 
      source={coach.image} 
      style={styles.coachImage} 
      accessibilityIgnoresInvertColors
      onError={(e) => console.error('Failed to load coach image:', e.nativeEvent.error)}
    />
    <View style={styles.coachInfo}>
      <Text style={styles.coachName}>{coach.name}</Text>
      <Text style={styles.philosophy}>{coach.philosophy}</Text>
      <View style={styles.traitsContainer}>
        {coach.traits.map((trait, index) => (
          <View key={index} style={styles.traitBadge}>
            <Text style={styles.traitText}>{trait}</Text>
          </View>
        ))}
      </View>
    </View>
  </TouchableOpacity>
);

export const CoachSelectionScreen = ({ route }: CoachSelectionScreenProps) => {
  const [selectedCoach, setSelectedCoach] = React.useState<Coach | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const navigation = useNavigation<NavigationProps>();

  const handleContinue = async () => {
    if (selectedCoach) {
      setIsLoading(true);
      try {
        // Navigate to next screen with selected coach
        navigation.navigate('Goals', { coachId: selectedCoach.id });
      } catch (error) {
        console.error('Navigation error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (route?.params?.error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{route.params.error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Coach</Text>
      <Text style={styles.subtitle}>Select a coach that matches your running goals</Text>
      
      <ScrollView 
        style={styles.coachList}
        contentContainerStyle={styles.scrollContent}
      >
        {mockCoaches.map((coach) => (
          <CoachCard
            key={coach.id}
            coach={coach}
            selected={selectedCoach?.id === coach.id}
            onSelect={() => setSelectedCoach(coach)}
          />
        ))}
      </ScrollView>

      <TouchableOpacity
        style={[styles.continueButton, !selectedCoach && styles.disabledButton]}
        onPress={handleContinue}
        disabled={!selectedCoach || isLoading}
        accessibilityRole="button"
        accessibilityLabel="Continue to next screen"
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.continueButtonText}>Continue</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  coachList: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  coachCard: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCard: {
    borderColor: '#007AFF',
  },
  coachImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  coachInfo: {
    flex: 1,
  },
  coachName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  philosophy: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  traitsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  traitBadge: {
    backgroundColor: '#E1E1E1',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  traitText: {
    fontSize: 12,
    color: '#444',
  },
  continueButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 