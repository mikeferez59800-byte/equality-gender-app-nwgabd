
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Stack } from "expo-router";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";

interface Example {
  id: number;
  category: string;
  stereotype: string;
  impact: string;
  alternative: string;
  icon: string;
}

const examples: Example[] = [
  {
    id: 1,
    category: "Jouets et Enfance",
    stereotype: "Les poupées sont pour les filles, les voitures pour les garçons",
    impact: "Limite le développement de compétences variées et renforce des rôles rigides dès le plus jeune âge.",
    alternative: "Tous les enfants peuvent jouer avec tous les jouets. Cela développe créativité, empathie et compétences diverses.",
    icon: "gift.fill"
  },
  {
    id: 2,
    category: "Émotions",
    stereotype: "Les garçons ne pleurent pas, les filles sont trop sensibles",
    impact: "Empêche l'expression saine des émotions et crée des problèmes de santé mentale.",
    alternative: "Tout le monde a le droit d'exprimer ses émotions. C'est sain et humain.",
    icon: "heart.fill"
  },
  {
    id: 3,
    category: "Apparence",
    stereotype: "Les femmes doivent être belles, les hommes doivent être forts",
    impact: "Crée une pression constante sur l'apparence et peut mener à des troubles de l'image corporelle.",
    alternative: "La valeur d'une personne ne dépend pas de son apparence. Chacun est unique et valable.",
    icon: "sparkles"
  },
  {
    id: 4,
    category: "Carrières",
    stereotype: "Certains métiers sont 'pour hommes' ou 'pour femmes'",
    impact: "Limite les choix de carrière et perpétue les inégalités professionnelles.",
    alternative: "Tous les métiers sont accessibles à tous. Les compétences n'ont pas de genre.",
    icon: "briefcase.fill"
  },
  {
    id: 5,
    category: "Tâches Domestiques",
    stereotype: "Les femmes sont naturellement meilleures pour le ménage et la cuisine",
    impact: "Crée une charge mentale et physique inégale dans les foyers.",
    alternative: "Les tâches domestiques doivent être partagées équitablement. Ce sont des compétences que tout le monde peut apprendre.",
    icon: "house.fill"
  },
  {
    id: 6,
    category: "Leadership",
    stereotype: "Les hommes sont des leaders naturels, les femmes sont trop douces",
    impact: "Empêche les femmes d'accéder à des postes de direction et valorise un seul style de leadership.",
    alternative: "Le leadership prend de nombreuses formes. L'empathie et la collaboration sont des forces, pas des faiblesses.",
    icon: "person.3.fill"
  },
  {
    id: 7,
    category: "Sports",
    stereotype: "Les sports sont plus importants pour les garçons",
    impact: "Décourage les filles de pratiquer des activités physiques et renforce les inégalités dans le sport.",
    alternative: "Le sport est bénéfique pour tous. Les filles et les garçons méritent le même soutien et les mêmes opportunités.",
    icon: "figure.run"
  },
  {
    id: 8,
    category: "Sciences",
    stereotype: "Les garçons sont meilleurs en maths et sciences",
    impact: "Décourage les filles de poursuivre des carrières scientifiques et techniques.",
    alternative: "Les capacités en sciences ne dépendent pas du genre. Encourageons tous les jeunes à explorer ces domaines.",
    icon: "flask.fill"
  }
];

export default function StereotypesExamplesScreen() {
  const [expandedExample, setExpandedExample] = useState<number | null>(null);

  const toggleExample = (id: number) => {
    setExpandedExample(expandedExample === id ? null : id);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Exemples de Stéréotypes",
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
            <IconSymbol name="list.bullet" color={colors.accent} size={40} />
            <Text style={styles.headerTitle}>Reconnaître les Stéréotypes</Text>
            <Text style={styles.headerText}>
              Découvrez des exemples concrets de stéréotypes de genre et comment les déconstruire.
            </Text>
          </View>

          {examples.map((example) => {
            const isExpanded = expandedExample === example.id;
            
            return (
              <View key={example.id} style={styles.exampleCard}>
                <Pressable
                  style={styles.exampleHeader}
                  onPress={() => toggleExample(example.id)}
                >
                  <View style={[styles.exampleIcon, { backgroundColor: colors.accent }]}>
                    <IconSymbol name={example.icon as any} color="#FFFFFF" size={24} />
                  </View>
                  <View style={styles.exampleHeaderContent}>
                    <Text style={styles.exampleCategory}>{example.category}</Text>
                  </View>
                  <IconSymbol 
                    name={isExpanded ? "chevron.up" : "chevron.down"} 
                    color={colors.accent} 
                    size={24} 
                  />
                </Pressable>

                {isExpanded && (
                  <View style={styles.exampleContent}>
                    <View style={styles.stereotypeSection}>
                      <Text style={styles.sectionLabel}>❌ Stéréotype</Text>
                      <Text style={styles.sectionText}>{example.stereotype}</Text>
                    </View>

                    <View style={styles.impactSection}>
                      <Text style={styles.sectionLabel}>⚠️ Impact</Text>
                      <Text style={styles.sectionText}>{example.impact}</Text>
                    </View>

                    <View style={styles.alternativeSection}>
                      <Text style={styles.sectionLabel}>✅ Alternative</Text>
                      <Text style={styles.sectionText}>{example.alternative}</Text>
                    </View>
                  </View>
                )}
              </View>
            );
          })}

          <View style={styles.footerCard}>
            <IconSymbol name="lightbulb.fill" color={colors.primary} size={32} />
            <Text style={styles.footerTitle}>Agir au Quotidien</Text>
            <Text style={styles.footerText}>
              Remettre en question les stéréotypes commence par les reconnaître. 
              Chaque fois que vous identifiez un stéréotype, vous faites un pas vers plus d'égalité.
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
  exampleCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    boxShadow: '0px 2px 8px rgba(123, 104, 238, 0.1)',
    elevation: 2,
  },
  exampleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  exampleIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  exampleHeaderContent: {
    flex: 1,
  },
  exampleCategory: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text,
  },
  exampleContent: {
    padding: 16,
    paddingTop: 0,
    gap: 16,
  },
  stereotypeSection: {
    backgroundColor: '#FFEBEE',
    borderRadius: 12,
    padding: 12,
  },
  impactSection: {
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
    padding: 12,
  },
  alternativeSection: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 12,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
  },
  sectionText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
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
  footerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 12,
    marginBottom: 8,
  },
  footerText: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});
