
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Stack, router } from "expo-router";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";

interface Job {
  id: number;
  title: string;
  description: string;
  stereotype: string;
  reality: string;
}

const jobs: Job[] = [
  {
    id: 1,
    title: "Ingénieur(e) en Informatique",
    description: "Développe des logiciels et applications",
    stereotype: "Métier d'homme - les femmes ne sont pas douées en tech",
    reality: "Les femmes sont tout aussi compétentes en informatique. Ada Lovelace a créé le premier algorithme informatique en 1843 !"
  },
  {
    id: 2,
    title: "Infirmier(ère)",
    description: "Soigne et accompagne les patients",
    stereotype: "Métier de femme - les hommes ne sont pas assez doux",
    reality: "Les hommes font d'excellents infirmiers. Le soin et l'empathie ne sont pas liés au genre."
  },
  {
    id: 3,
    title: "Pilote d'Avion",
    description: "Pilote des avions commerciaux",
    stereotype: "Métier d'homme - trop technique pour les femmes",
    reality: "Les femmes pilotes sont aussi compétentes. Amelia Earhart a été une pionnière de l'aviation dans les années 1930."
  },
  {
    id: 4,
    title: "Sage-Femme",
    description: "Accompagne les femmes enceintes et les accouchements",
    stereotype: "Métier exclusivement féminin",
    reality: "Les hommes peuvent être sages-femmes (maïeuticiens). Leur présence apporte une diversité bénéfique."
  },
  {
    id: 5,
    title: "Chef Cuisinier(ère)",
    description: "Dirige une cuisine professionnelle",
    stereotype: "Les grands chefs sont des hommes, les femmes cuisinent à la maison",
    reality: "Les femmes sont d'excellentes chefs. Le talent culinaire n'a pas de genre. De nombreuses femmes dirigent des restaurants étoilés."
  },
  {
    id: 6,
    title: "Mécanicien(ne) Auto",
    description: "Répare et entretient les véhicules",
    stereotype: "Métier d'homme - trop salissant et physique pour les femmes",
    reality: "Les femmes sont tout aussi capables de réparer des voitures. La force physique n'est qu'un aspect parmi d'autres."
  }
];

export default function EqualityGameScreen() {
  const [currentJob, setCurrentJob] = useState(0);
  const [showReality, setShowReality] = useState(false);
  const [completedJobs, setCompletedJobs] = useState(0);

  const handleReveal = () => {
    setShowReality(true);
  };

  const handleNext = () => {
    if (currentJob < jobs.length - 1) {
      setCurrentJob(currentJob + 1);
      setShowReality(false);
      setCompletedJobs(completedJobs + 1);
    } else {
      setCompletedJobs(completedJobs + 1);
      router.back();
    }
  };

  const job = jobs[currentJob];

  return (
    <>
      <Stack.Screen
        options={{
          title: `Métier ${currentJob + 1}/${jobs.length}`,
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }}
      />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  width: `${((currentJob + 1) / jobs.length) * 100}%`,
                  backgroundColor: colors.secondary 
                }
              ]} 
            />
          </View>

          <View style={styles.jobCard}>
            <View style={[styles.jobIcon, { backgroundColor: colors.secondary }]}>
              <IconSymbol name="briefcase.fill" color="#FFFFFF" size={40} />
            </View>
            <Text style={styles.jobTitle}>{job.title}</Text>
            <Text style={styles.jobDescription}>{job.description}</Text>
          </View>

          <View style={styles.stereotypeCard}>
            <View style={styles.cardHeader}>
              <IconSymbol name="exclamationmark.triangle.fill" color="#FF6B6B" size={24} />
              <Text style={styles.cardTitle}>Stéréotype</Text>
            </View>
            <Text style={styles.stereotypeText}>{job.stereotype}</Text>
          </View>

          {!showReality && (
            <Pressable 
              style={[styles.revealButton, { backgroundColor: colors.secondary }]} 
              onPress={handleReveal}
            >
              <Text style={styles.revealButtonText}>Découvrir la Réalité</Text>
              <IconSymbol name="eye.fill" color="#FFFFFF" size={20} />
            </Pressable>
          )}

          {showReality && (
            <>
              <View style={styles.realityCard}>
                <View style={styles.cardHeader}>
                  <IconSymbol name="checkmark.circle.fill" color={colors.accent} size={24} />
                  <Text style={styles.cardTitle}>Réalité</Text>
                </View>
                <Text style={styles.realityText}>{job.reality}</Text>
              </View>

              <View style={styles.messageCard}>
                <IconSymbol name="lightbulb.fill" color={colors.primary} size={28} />
                <Text style={styles.messageText}>
                  Tous les métiers sont accessibles à tous, indépendamment du genre. Les compétences et la passion sont ce qui compte vraiment !
                </Text>
              </View>

              <Pressable 
                style={[styles.nextButton, { backgroundColor: colors.primary }]} 
                onPress={handleNext}
              >
                <Text style={styles.nextButtonText}>
                  {currentJob < jobs.length - 1 ? "Métier Suivant" : "Terminer"}
                </Text>
              </Pressable>
            </>
          )}
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
  progressBar: {
    height: 8,
    backgroundColor: colors.highlight,
    borderRadius: 4,
    marginBottom: 24,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  jobCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    boxShadow: '0px 4px 12px rgba(123, 104, 238, 0.15)',
    elevation: 3,
  },
  jobIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  jobTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  jobDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  stereotypeCard: {
    backgroundColor: '#FFEBEE',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B6B',
  },
  realityCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  stereotypeText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  realityText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    fontWeight: '500',
  },
  revealButton: {
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  revealButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  messageCard: {
    backgroundColor: colors.highlight,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  messageText: {
    fontSize: 15,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 12,
  },
  nextButton: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
