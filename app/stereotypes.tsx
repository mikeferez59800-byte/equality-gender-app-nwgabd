
import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Stack, router } from "expo-router";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";

export default function StereotypesScreen() {
  const activities = [
    {
      id: "quiz",
      title: "Quiz sur les Stéréotypes",
      description: "Identifiez les idées reçues",
      icon: "questionmark.circle.fill",
      route: "/stereotypes-quiz",
    },
    {
      id: "game",
      title: "Vrai ou Faux",
      description: "Démêlez le vrai du faux",
      icon: "checkmark.seal.fill",
      route: "/stereotypes-game",
    },
    {
      id: "examples",
      title: "Exemples de Stéréotypes",
      description: "Apprenez à les reconnaître",
      icon: "list.bullet",
      route: "/stereotypes-examples",
    },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          title: "Stéréotypes",
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }}
      />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerSection}>
            <View style={[styles.headerIcon, { backgroundColor: colors.accent }]}>
              <IconSymbol name="brain.head.profile" color="#FFFFFF" size={48} />
            </View>
            <Text style={styles.headerTitle}>Les Stéréotypes de Genre</Text>
            <Text style={styles.headerDescription}>
              Les stéréotypes sont des idées préconçues qui limitent les individus. Apprenons à les identifier et à les déconstruire.
            </Text>
          </View>

          <View style={styles.keyPointsCard}>
            <Text style={styles.keyPointsTitle}>Qu'est-ce qu'un stéréotype ?</Text>
            <View style={styles.keyPoint}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.keyPointText}>Une généralisation simpliste sur un groupe</Text>
            </View>
            <View style={styles.keyPoint}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.keyPointText}>Souvent basé sur des préjugés, pas des faits</Text>
            </View>
            <View style={styles.keyPoint}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.keyPointText}>Limite les choix et opportunités des personnes</Text>
            </View>
            <View style={styles.keyPoint}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.keyPointText}>Peut être déconstruit par l'éducation</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Activités</Text>
          <View style={styles.activitiesContainer}>
            {activities.map((activity) => (
              <Pressable
                key={activity.id}
                style={styles.activityCard}
                onPress={() => router.push(activity.route as any)}
              >
                <View style={[styles.activityIcon, { backgroundColor: colors.accent }]}>
                  <IconSymbol name={activity.icon as any} color="#FFFFFF" size={28} />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  <Text style={styles.activityDescription}>{activity.description}</Text>
                </View>
                <IconSymbol name="chevron.right" color={colors.textSecondary} size={20} />
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  headerIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  headerDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  keyPointsCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    boxShadow: '0px 4px 12px rgba(123, 104, 238, 0.15)',
    elevation: 3,
  },
  keyPointsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  keyPoint: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  bullet: {
    fontSize: 16,
    color: colors.accent,
    marginRight: 8,
    fontWeight: 'bold',
  },
  keyPointText: {
    fontSize: 15,
    color: colors.text,
    flex: 1,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  activitiesContainer: {
    gap: 12,
  },
  activityCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: '0px 4px 12px rgba(123, 104, 238, 0.15)',
    elevation: 3,
  },
  activityIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});
