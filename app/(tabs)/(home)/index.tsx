
import React from "react";
import { Stack, Link } from "expo-router";
import { ScrollView, Pressable, StyleSheet, View, Text, Platform } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";

export default function HomeScreen() {
  const topics = [
    {
      title: "Consentement",
      description: "Comprendre et respecter le consentement",
      route: "/consent",
      icon: "hand.raised.fill",
      color: colors.primary,
    },
    {
      title: "Égalité Homme-Femme",
      description: "Promouvoir l'égalité des genres",
      route: "/equality",
      icon: "person.2.fill",
      color: colors.secondary,
    },
    {
      title: "Stéréotypes",
      description: "Déconstruire les stéréotypes de genre",
      route: "/stereotypes",
      icon: "brain.head.profile",
      color: colors.accent,
    }
  ];

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "EgaDarras 🩷",
            headerLargeTitle: true,
          }}
        />
      )}
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            Platform.OS !== 'ios' && styles.scrollContentWithTabBar
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.welcomeTitle}>EgaDarras 🩷</Text>
            <Text style={styles.welcomeText}>
              Explorez des sujets importants à travers des jeux, des quiz et des situations réelles.
            </Text>
          </View>

          <View style={styles.topicsContainer}>
            {topics.map((topic, index) => (
              <Link key={index} href={topic.route as any} asChild>
                <Pressable style={styles.topicCard}>
                  <View style={[styles.iconContainer, { backgroundColor: topic.color }]}>
                    <IconSymbol name={topic.icon as any} color="#FFFFFF" size={32} />
                  </View>
                  <View style={styles.topicContent}>
                    <Text style={styles.topicTitle}>{topic.title}</Text>
                    <Text style={styles.topicDescription}>{topic.description}</Text>
                  </View>
                  <IconSymbol name="chevron.right" color={colors.textSecondary} size={20} />
                </Pressable>
              </Link>
            ))}
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>💡 Le saviez-vous ?</Text>
            <Text style={styles.infoText}>
              L'éducation à l'égalité et au respect mutuel est essentielle pour construire une société plus juste et inclusive.
            </Text>
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
  },
  scrollContentWithTabBar: {
    paddingBottom: 100,
  },
  header: {
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  topicsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  topicCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: '0px 4px 12px rgba(123, 104, 238, 0.15)',
    elevation: 3,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  topicContent: {
    flex: 1,
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  topicDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  infoCard: {
    backgroundColor: colors.highlight,
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
