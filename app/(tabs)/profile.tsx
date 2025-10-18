
import React from "react";
import { View, Text, StyleSheet, ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.contentContainer,
          Platform.OS !== 'ios' && styles.contentContainerWithTabBar
        ]}
      >
        <View style={styles.profileHeader}>
          <View style={[styles.avatarCircle, { backgroundColor: colors.primary }]}>
            <IconSymbol name="person.fill" size={60} color="#FFFFFF" />
          </View>
          <Text style={styles.name}>Utilisateur</Text>
          <Text style={styles.subtitle}>Apprenant engagé</Text>
        </View>

        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Vos Progrès</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: colors.primary }]}>
                <IconSymbol name="checkmark.circle.fill" size={28} color="#FFFFFF" />
              </View>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Quiz complétés</Text>
            </View>
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: colors.secondary }]}>
                <IconSymbol name="star.fill" size={28} color="#FFFFFF" />
              </View>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Jeux terminés</Text>
            </View>
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: colors.accent }]}>
                <IconSymbol name="book.fill" size={28} color="#FFFFFF" />
              </View>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Leçons lues</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoCard}>
          <IconSymbol name="info.circle.fill" color={colors.primary} size={28} />
          <Text style={styles.infoTitle}>À Propos de Cette App</Text>
          <Text style={styles.infoText}>
            Cette application a été créée pour sensibiliser aux questions d'égalité, de consentement et de stéréotypes de genre. 
            Continuez à apprendre et à partager vos connaissances !
          </Text>
        </View>

        <View style={styles.motivationCard}>
          <IconSymbol name="heart.fill" color={colors.accent} size={32} />
          <Text style={styles.motivationText}>
            "L'égalité n'est pas un concept. C'est un droit humain fondamental."
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  contentContainerWithTabBar: {
    paddingBottom: 100,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  statsCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0px 4px 12px rgba(123, 104, 238, 0.15)',
    elevation: 3,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0px 4px 12px rgba(123, 104, 238, 0.15)',
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 12,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  motivationCard: {
    backgroundColor: colors.highlight,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
  },
  motivationText: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 24,
    marginTop: 12,
    fontStyle: 'italic',
    fontWeight: '500',
  },
});
