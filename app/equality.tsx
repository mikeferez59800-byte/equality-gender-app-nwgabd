
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Platform } from "react-native";
import { Stack, router } from "expo-router";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";

export default function EqualityScreen() {
  const activities = [
    {
      id: "quiz",
      title: "Quiz sur l'Égalité",
      description: "Testez vos connaissances",
      icon: "questionmark.circle.fill",
      route: "/equality-quiz",
    },
    {
      id: "game",
      title: "Jeu des Métiers",
      description: "Déconstruisez les préjugés",
      icon: "briefcase.fill",
      route: "/equality-game",
    },
    {
      id: "facts",
      title: "Faits et Chiffres",
      description: "Données sur l'égalité",
      icon: "chart.bar.fill",
      route: "/equality-facts",
    },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          title: "Égalité Homme-Femme",
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
            <View style={[styles.headerIcon, { backgroundColor: colors.secondary }]}>
              <IconSymbol name="person.2.fill" color="#FFFFFF" size={48} />
            </View>
            <Text style={styles.headerTitle}>Égalité des Genres</Text>
            <Text style={styles.headerDescription}>
              L'égalité entre les hommes et les femmes est un droit fondamental. Ensemble, construisons une société plus juste.
            </Text>
          </View>

          <View style={styles.keyPointsCard}>
            <Text style={styles.keyPointsTitle}>Principes Fondamentaux :</Text>
            <View style={styles.keyPoint}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.keyPointText}>Égalité des droits et des opportunités</Text>
            </View>
            <View style={styles.keyPoint}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.keyPointText}>Respect mutuel et dignité pour tous</Text>
            </View>
            <View style={styles.keyPoint}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.keyPointText}>Lutte contre les discriminations</Text>
            </View>
            <View style={styles.keyPoint}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.keyPointText}>Partage équitable des responsabilités</Text>
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
                <View style={[styles.activityIcon, { backgroundColor: colors.secondary }]}>
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
    color: colors.secondary,
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
