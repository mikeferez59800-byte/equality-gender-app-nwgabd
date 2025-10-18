
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Stack } from "expo-router";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";

interface Scenario {
  id: number;
  title: string;
  situation: string;
  goodExample: string;
  badExample: string;
  keyTakeaway: string;
}

const scenarios: Scenario[] = [
  {
    id: 1,
    title: "Premier Rendez-vous",
    situation: "Alex et Jordan se rencontrent pour la première fois après avoir discuté en ligne.",
    goodExample: "Alex demande : 'Est-ce que je peux te faire un câlin ?' et attend la réponse de Jordan avant d'agir. Jordan se sent respecté(e) et en sécurité.",
    badExample: "Alex s'approche directement pour embrasser Jordan sans demander. Jordan se sent mal à l'aise mais n'ose rien dire.",
    keyTakeaway: "Toujours demander la permission avant tout contact physique, même un simple câlin. Le consentement verbal est important."
  },
  {
    id: 2,
    title: "Soirée Entre Amis",
    situation: "Lors d'une fête, plusieurs personnes ont bu de l'alcool.",
    goodExample: "Sam remarque que Chris a beaucoup bu et propose de le/la raccompagner en sécurité, sans rien attendre en retour. Sam respecte l'état de vulnérabilité de Chris.",
    badExample: "Sam profite du fait que Chris a bu pour tenter des avances, pensant que Chris sera plus 'facile à convaincre'.",
    keyTakeaway: "Une personne intoxiquée ne peut pas donner un consentement éclairé. Profiter de cette situation est inacceptable et peut être illégal."
  },
  {
    id: 3,
    title: "Dans Une Relation",
    situation: "Lou et Morgan sont en couple depuis un an.",
    goodExample: "Lou demande à Morgan : 'Tu as envie qu'on passe un moment intime ?' Morgan répond qu'il/elle est fatigué(e). Lou dit : 'Pas de problème, on se fait un câlin devant un film ?'",
    badExample: "Lou insiste lourdement quand Morgan dit non, en disant : 'Mais on est ensemble, c'est normal !' Morgan cède par culpabilité.",
    keyTakeaway: "Être en couple ne signifie pas un consentement automatique. Chaque interaction nécessite un accord mutuel, et 'non' doit toujours être respecté."
  },
  {
    id: 4,
    title: "Changement d'Avis",
    situation: "Deux personnes commencent à s'embrasser.",
    goodExample: "Au milieu d'un baiser, Taylor dit 'Attends, je ne suis pas à l'aise'. Casey s'arrête immédiatement et demande : 'Tout va bien ? On peut juste discuter si tu préfères.'",
    badExample: "Taylor hésite et semble mal à l'aise, mais Casey continue en ignorant les signaux, pensant que 'c'est trop tard pour s'arrêter maintenant'.",
    keyTakeaway: "Le consentement peut être retiré à tout moment, même au milieu d'une activité. Il faut toujours respecter ce changement d'avis."
  },
  {
    id: 5,
    title: "Messages et Photos",
    situation: "Deux personnes échangent des messages.",
    goodExample: "Avant d'envoyer une photo intime, Riley demande : 'Est-ce que tu es d'accord pour que je t'envoie ce type de photo ?' et attend une réponse claire avant d'envoyer quoi que ce soit.",
    badExample: "Riley envoie une photo intime sans prévenir, en pensant que 'si ça ne plaît pas, l'autre n'a qu'à ne pas regarder'.",
    keyTakeaway: "Le consentement s'applique aussi au contenu numérique. Envoyer du contenu intime sans permission est une violation du consentement."
  },
  {
    id: 6,
    title: "Pression du Groupe",
    situation: "Un groupe d'amis encourage quelqu'un à faire quelque chose.",
    goodExample: "Le groupe propose une activité. Quand une personne dit qu'elle n'est pas intéressée, les autres répondent : 'Pas de souci, on peut faire autre chose ensemble !'",
    badExample: "Le groupe insiste lourdement, se moque de la personne qui refuse, et la fait se sentir exclue si elle ne participe pas.",
    keyTakeaway: "La pression du groupe peut empêcher un consentement libre. Un vrai consentement est donné sans pression sociale ou émotionnelle."
  }
];

export default function ConsentScenariosScreen() {
  const [expandedScenario, setExpandedScenario] = useState<number | null>(null);

  const toggleScenario = (id: number) => {
    setExpandedScenario(expandedScenario === id ? null : id);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Exemples de Situations",
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
            <IconSymbol name="book.fill" color={colors.primary} size={40} />
            <Text style={styles.headerTitle}>Situations Réelles</Text>
            <Text style={styles.headerText}>
              Découvrez des exemples concrets pour mieux comprendre le consentement dans différentes situations.
            </Text>
          </View>

          {scenarios.map((scenario) => {
            const isExpanded = expandedScenario === scenario.id;
            
            return (
              <View key={scenario.id} style={styles.scenarioCard}>
                <Pressable
                  style={styles.scenarioHeader}
                  onPress={() => toggleScenario(scenario.id)}
                >
                  <View style={styles.scenarioHeaderContent}>
                    <Text style={styles.scenarioNumber}>#{scenario.id}</Text>
                    <Text style={styles.scenarioTitle}>{scenario.title}</Text>
                  </View>
                  <IconSymbol 
                    name={isExpanded ? "chevron.up" : "chevron.down"} 
                    color={colors.primary} 
                    size={24} 
                  />
                </Pressable>

                {isExpanded && (
                  <View style={styles.scenarioContent}>
                    <View style={styles.situationSection}>
                      <Text style={styles.sectionLabel}>📖 Situation</Text>
                      <Text style={styles.sectionText}>{scenario.situation}</Text>
                    </View>

                    <View style={[styles.exampleSection, { backgroundColor: '#E8F5E9' }]}>
                      <Text style={styles.exampleLabel}>✅ Bon Exemple</Text>
                      <Text style={styles.exampleText}>{scenario.goodExample}</Text>
                    </View>

                    <View style={[styles.exampleSection, { backgroundColor: '#FFEBEE' }]}>
                      <Text style={styles.exampleLabel}>❌ Mauvais Exemple</Text>
                      <Text style={styles.exampleText}>{scenario.badExample}</Text>
                    </View>

                    <View style={styles.takeawaySection}>
                      <Text style={styles.takeawayLabel}>💡 À Retenir</Text>
                      <Text style={styles.takeawayText}>{scenario.keyTakeaway}</Text>
                    </View>
                  </View>
                )}
              </View>
            );
          })}

          <View style={styles.footerCard}>
            <IconSymbol name="heart.fill" color={colors.accent} size={32} />
            <Text style={styles.footerText}>
              Le respect du consentement est la base de toute relation saine et respectueuse.
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
  scenarioCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    boxShadow: '0px 2px 8px rgba(123, 104, 238, 0.1)',
    elevation: 2,
  },
  scenarioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  scenarioHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  scenarioNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginRight: 12,
  },
  scenarioTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  scenarioContent: {
    padding: 16,
    paddingTop: 0,
    gap: 16,
  },
  situationSection: {
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.highlight,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  exampleSection: {
    borderRadius: 12,
    padding: 12,
  },
  exampleLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
  },
  exampleText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  takeawaySection: {
    backgroundColor: colors.highlight,
    borderRadius: 12,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  takeawayLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
  },
  takeawayText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    fontWeight: '500',
  },
  footerCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginTop: 12,
    boxShadow: '0px 4px 12px rgba(123, 104, 238, 0.15)',
    elevation: 3,
  },
  footerText: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 12,
  },
});
