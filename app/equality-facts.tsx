
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Stack } from "expo-router";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";

interface Fact {
  id: number;
  category: string;
  icon: string;
  stat: string;
  description: string;
  color: string;
}

const facts: Fact[] = [
  {
    id: 1,
    category: "Salaires",
    icon: "eurosign.circle.fill",
    stat: "15-25%",
    description: "Écart salarial moyen entre hommes et femmes en France pour un travail équivalent",
    color: colors.primary,
  },
  {
    id: 2,
    category: "Politique",
    icon: "building.columns.fill",
    stat: "37%",
    description: "Pourcentage de femmes à l'Assemblée nationale française (2022)",
    color: colors.secondary,
  },
  {
    id: 3,
    category: "Entreprises",
    icon: "chart.line.uptrend.xyaxis",
    stat: "20%",
    description: "Proportion de femmes dans les conseils d'administration des grandes entreprises",
    color: colors.accent,
  },
  {
    id: 4,
    category: "Éducation",
    icon: "graduationcap.fill",
    stat: "57%",
    description: "Les femmes représentent 57% des diplômés de l'enseignement supérieur",
    color: colors.primary,
  },
  {
    id: 5,
    category: "Tâches Domestiques",
    icon: "house.fill",
    stat: "72%",
    description: "Pourcentage des tâches ménagères effectuées par les femmes dans les couples hétérosexuels",
    color: colors.secondary,
  },
  {
    id: 6,
    category: "Sciences",
    icon: "flask.fill",
    stat: "28%",
    description: "Proportion de femmes dans les métiers scientifiques et techniques",
    color: colors.accent,
  },
];

export default function EqualityFactsScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Faits et Chiffres",
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }}
      />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerCard}>
            <IconSymbol name="chart.bar.fill" color={colors.secondary} size={40} />
            <Text style={styles.headerTitle}>Données sur l'Égalité</Text>
            <Text style={styles.headerText}>
              Des chiffres qui illustrent les inégalités persistantes et les progrès à accomplir.
            </Text>
          </View>

          {facts.map((fact) => (
            <View key={fact.id} style={styles.factCard}>
              <View style={[styles.factIcon, { backgroundColor: fact.color }]}>
                <IconSymbol name={fact.icon as any} color="#FFFFFF" size={32} />
              </View>
              <View style={styles.factContent}>
                <Text style={styles.factCategory}>{fact.category}</Text>
                <Text style={[styles.factStat, { color: fact.color }]}>{fact.stat}</Text>
                <Text style={styles.factDescription}>{fact.description}</Text>
              </View>
            </View>
          ))}

          <View style={styles.infoCard}>
            <IconSymbol name="info.circle.fill" color={colors.primary} size={28} />
            <Text style={styles.infoTitle}>Pourquoi ces chiffres sont importants ?</Text>
            <Text style={styles.infoText}>
              Ces statistiques montrent que malgré les progrès, des inégalités persistent. 
              La prise de conscience est la première étape vers le changement.
            </Text>
          </View>

          <View style={styles.actionCard}>
            <IconSymbol name="hand.raised.fill" color={colors.accent} size={28} />
            <Text style={styles.actionTitle}>Agir pour l'Égalité</Text>
            <View style={styles.actionList}>
              <View style={styles.actionItem}>
                <Text style={styles.actionBullet}>•</Text>
                <Text style={styles.actionText}>Remettre en question les stéréotypes</Text>
              </View>
              <View style={styles.actionItem}>
                <Text style={styles.actionBullet}>•</Text>
                <Text style={styles.actionText}>Partager équitablement les tâches</Text>
              </View>
              <View style={styles.actionItem}>
                <Text style={styles.actionBullet}>•</Text>
                <Text style={styles.actionText}>Soutenir l'égalité salariale</Text>
              </View>
              <View style={styles.actionItem}>
                <Text style={styles.actionBullet}>•</Text>
                <Text style={styles.actionText}>Encourager la diversité</Text>
              </View>
            </View>
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
  headerCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    boxShadow: '0px 4px 12px rgba(123, 104, 238, 0.15)',
    elevation: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 12,
    marginBottom: 8,
  },
  headerText: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  factCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    boxShadow: '0px 4px 12px rgba(123, 104, 238, 0.15)',
    elevation: 3,
  },
  factIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  factContent: {
    flex: 1,
  },
  factCategory: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  factStat: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  factDescription: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  infoCard: {
    backgroundColor: colors.highlight,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
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
  actionCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    boxShadow: '0px 4px 12px rgba(123, 104, 238, 0.15)',
    elevation: 3,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 12,
    marginBottom: 16,
  },
  actionList: {
    gap: 12,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  actionBullet: {
    fontSize: 16,
    color: colors.accent,
    marginRight: 8,
    fontWeight: 'bold',
  },
  actionText: {
    fontSize: 15,
    color: colors.text,
    flex: 1,
    lineHeight: 22,
  },
});
