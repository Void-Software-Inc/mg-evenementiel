export type Menu = {
  id: string;
  title: string;
  price: string;
  description: string;
  details: Record<string, string[]>;
  image: string;
};

export const menus: Menu[] = [
  {
    id: "essentiel",
    title: "Menu Essentiel",
    price: "59 €/pers.",
    description: "La formule parfaite pour un mariage élégant et raffiné, en toute simplicité.",
    details: {
      "Entrées (1 au choix)": ["Salade estivale melon et jambon cru", "OU", "Salade de gésiers confits et garniture", "OU", "Aumônière au chèvre frais et tapenade"],
      "Plats (1 au choix)": ["Filet mignon de porc sauce moutarde\nÉcrasé de pommes de terre", "OU", "Filet de saumon\nRiz parfumé\nPoêlée de poivrons colorés", "OU", "Risotto aux délices de la mer"],
      "Fromages": ["Duo de fromages (Compté et Brie)", "Mélange de salade verte"],
      "Desserts": ["Fraisier gourmand et son crémeux vanillé", "OU", "Crémeux chocolaté en duo"],
      "Inclus": ["Pain", "Eau plate/gazeuse", "Café", "Nappage", "Verrerie (Verres à eau, à vin et à champagne)", "Vaisselle (Couverts et assiettes)", "Serviettes", "Service à table"],
    },
    image: 'https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/enmanuel-betances-santos-Xxe37tN-Rcs-unsplash.jpg'
  },
  {
    id: "premium",
    title: "Menu Premium",
    price: "79 €/pers.",
    description: "Montez en gamme avec des saveurs plus audacieuses et des produits d'exception.",
    details: {
      "Entrées": ["Délice de cheesecake au saumon et au citron", "OU", "Salade tropicale de crevettes, ananas et coriande", "OU", "Crème élégante de lentilles au foie gras"],
      "Plats": ["Magret de canard sauce miel et romarin\nGratin de pommes de terre crémeux\nFagot de haricots verts", "OU", "Dos de cabillaud\nCrumble de chorizo croustillant\nLit de riz et fondue de poireaux", "OU", "Pavé de rumsteck\nSauce au poivre\nÉcrasé de pommes de terre\nTomates farcies au chèvre"],
      "Fromage": ["Assiette de 3 fromages (Fromages séléctionnés par nos soins)", "Mélange de salade verte"],
      "Desserts": ["Tartelette à la mousse au chocolat et coeur coulant praliné", "OU", "Fondant façon tarte au citron"],
      "Inclus": ["Pain", "Eau plate/gazeuse", "Café", "Nappage", "Verrerie (Verres à eau, à vin et à champagne)", "Vaisselle (Couverts et assiettes)", "Serviettes", "Service à table"],
    },
    image: 'https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/enmanuel-betances-santos-Xxe37tN-Rcs-unsplash.jpg'
  },
  {
    id: "prestige",
    title: "Menu Prestige",
    price: "109 €/pers.",
    description: "L'expérience culinaire ultime pour un mariage sans compromis, du vin d'honneur au dessert.",
    details: {
      "Entrées": ["Tartare de daurade royale", "OU", "Croustillant de Saint-Jacques", "OU", "Foie gras avec compoté d'oignon et figues sur toast"],
      "Plats": ["Filet de bœuf au trois purées\nGarniture forestière", "OU", "Noix de Saint-Jacques poêlées sauce curry\nÉcrasé de patates douces\nPrintanière de légumes", "OU", "Suprême de volaille à la crème\nLangoustines rôties accompagnées de purée de topinambours\nChampignons sauvages"],
      "Fromages": ["Assiette de 5 fromages (Fromages sélectionnés par nos soins)", "Mélange de salade verte"],
      "Desserts": ["Merveilleux Chocolaté", "OU", "Plateau de mignardises sucrées (5 par convive)"],
      "Inclus": ["Vin d'honneur", "Pain", "Eau plate/gazeuse", "Café", "Nappage", "Verrerie (Verres à eau, à vin et à champagne)", "Vaisselle (Couverts et assiettes)", "Serviettes", "Service à table"],
      "Vin d'Honneur": ["Mise en bouche (8 petits fours salés par convive)", "Atelier dégustation"],
    },
    image: 'https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/enmanuel-betances-santos-Xxe37tN-Rcs-unsplash.jpg'
  },
  {
    id: "enfant",
    title: "Menu Enfant",
    price: "17 €/enfant",
    description: "Un menu savoureux et adapté pour que les plus jeunes aussi se régalent.",
    details: {
      "Entrées": ["Billes de melon, boules de mozzarella et tomates cerises", "OU", "Mini quiches légumes ou jambon-fromage"],
      "Plats": ["Cuisses de poulet à la crème et pommes dauphines", "OU", "Cheeseburger avec son cornet de frites"],
      "Desserts": ["Brochette de fruits de saison", "OU", "Glace surprise"],
      "Boissons": ["Capri Sun"],
    },
    image: 'https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/enmanuel-betances-santos-Xxe37tN-Rcs-unsplash.jpg'
  },
]; 