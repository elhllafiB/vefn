import React, { useState } from 'react';

const CategoriesProducts = () => {
  // État pour gérer l'affichage des produits par catégorie
  const [visibleProducts, setVisibleProducts] = useState({
    'sacs-housses': 4,
    'serviettes-peignoirs': 4,
    'organisation-decoration': 4,
    'salle-bain-hygiene': 4
  });

  // Données des catégories et produits
  const categories = [
    {
      id: 'sacs-housses',
      name: 'Sacs & Housses',
      products: [
        {
          id: 1,
          name: "SÁBANA AJUSTABLE CON F...",
          image: "/images/sabana-ajustable.jpg",
          price: 19.99,
          oldPrice: 30.75,
          discount: 35,
          rating: 4.8,
          reviews: 70,
          badge: "TOP VENTE",
          sales: 880
        },
        {
          id: 2,
          name: "SERTA SIMPLY CLEAN SOL...",
          image: "/images/serta-clean.jpg",
          price: 29.99,
          oldPrice: 28.97,
          discount: 31,
          rating: 4.7,
          reviews: 102,
          badge: "LIMITED OFFER",
          sales: 344
        },
        {
          id: 3,
          name: "FUNDA NÓRDICA NEGRA PREMIUM",
          image: "/images/funda-nordica.jpg",
          price: 9.99,
          oldPrice: 41.08,
          discount: 27,
          rating: 4.9,
          reviews: 45,
          badge: null,
          sales: 51
        },
        {
          id: 4,
          name: "COJÍN CUADRADO TAPIZADO MARRÓN",
          image: "/images/cojin-cuadrado.jpg",
          price: 14.99,
          oldPrice: 14.94,
          discount: 33,
          rating: 4.6,
          reviews: 28,
          badge: null,
          sales: 392
        },
        {
          id: 5,
          name: "PROTECTOR COLCHÓN DIAMANTE BEIGE",
          image: "/images/protector-beige.jpg",
          price: 24.99,
          oldPrice: 35.00,
          discount: 29,
          rating: 4.5,
          reviews: 156,
          badge: "TOP VENTE",
          sales: 623
        },
        {
          id: 6,
          name: "FUNDA ALMOHADA ANTI-ÁCAROS",
          image: "/images/funda-almohada.jpg",
          price: 7.99,
          oldPrice: 12.50,
          discount: 36,
          rating: 4.7,
          reviews: 89,
          badge: null,
          sales: 234
        }
      ]
    },
    {
      id: 'serviettes-peignoirs',
      name: 'Serviettes & Peignoirs',
      products: [
        {
          id: 7,
          name: "SERVIETTE ÉPONGE MICROFIBRE",
          image: "/images/serviette-microfibre.jpg",
          price: 12.99,
          oldPrice: 18.99,
          discount: 32,
          rating: 4.6,
          reviews: 78,
          badge: "TOP VENTE",
          sales: 445
        },
        {
          id: 8,
          name: "PEIGNOIR CAPUCHON COTON",
          image: "/images/peignoir-coton.jpg",
          price: 39.99,
          oldPrice: 55.00,
          discount: 27,
          rating: 4.8,
          reviews: 92,
          badge: null,
          sales: 167
        },
        {
          id: 9,
          name: "SERVIETTE BORDÉE BAMBOU",
          image: "/images/serviette-bambou.jpg",
          price: 15.99,
          oldPrice: 22.50,
          discount: 29,
          rating: 4.7,
          reviews: 54,
          badge: "LIMITED OFFER",
          sales: 298
        },
        {
          id: 10,
          name: "PEIGNOIR COURT VELOURS",
          image: "/images/peignoir-velours.jpg",
          price: 29.99,
          oldPrice: 42.00,
          discount: 29,
          rating: 4.5,
          reviews: 67,
          badge: null,
          sales: 189
        },
        {
          id: 11,
          name: "SERVIETTE SPORT ANTI-BACTÉRIENNE",
          image: "/images/serviette-sport.jpg",
          price: 18.99,
          oldPrice: 25.99,
          discount: 27,
          rating: 4.8,
          reviews: 123,
          badge: "TOP VENTE",
          sales: 356
        },
        {
          id: 12,
          name: "PEIGNOIR LONG SOIE NATURELLE",
          image: "/images/peignoir-soie.jpg",
          price: 79.99,
          oldPrice: 120.00,
          discount: 33,
          rating: 4.9,
          reviews: 45,
          badge: null,
          sales: 78
        }
      ]
    },
    {
      id: 'organisation-decoration',
      name: 'Organisation & Décoration',
      products: [
        {
          id: 13,
          name: "PANIERS RATTAN ORGANISATION",
          image: "/images/paniers-rattan.jpg",
          price: 22.99,
          oldPrice: 32.99,
          discount: 30,
          rating: 4.7,
          reviews: 89,
          badge: "TOP VENTE",
          sales: 234
        },
        {
          id: 14,
          name: "VASE CÉRAMIQUE MODERNE",
          image: "/images/vase-ceramique.jpg",
          price: 34.99,
          oldPrice: 49.99,
          discount: 30,
          rating: 4.6,
          reviews: 56,
          badge: null,
          sales: 145
        },
        {
          id: 15,
          name: "BOÎTES STOCKAGE TRANSPARENTES",
          image: "/images/boites-stockage.jpg",
          price: 16.99,
          oldPrice: 24.99,
          discount: 32,
          rating: 4.8,
          reviews: 112,
          badge: "LIMITED OFFER",
          sales: 378
        },
        {
          id: 16,
          name: "MIRROIR DÉCORATIF ROND",
          image: "/images/miroir-rond.jpg",
          price: 45.99,
          oldPrice: 65.00,
          discount: 29,
          rating: 4.5,
          reviews: 73,
          badge: null,
          sales: 198
        },
        {
          id: 17,
          name: "ÉTAGÈRE FLOTTANTE BOIS",
          image: "/images/etagere-bois.jpg",
          price: 28.99,
          oldPrice: 39.99,
          discount: 28,
          rating: 4.7,
          reviews: 94,
          badge: "TOP VENTE",
          sales: 267
        },
        {
          id: 18,
          name: "PLANTE ARTIFICIELLE SUCCULENTE",
          image: "/images/plante-succulente.jpg",
          price: 12.99,
          oldPrice: 18.99,
          discount: 32,
          rating: 4.6,
          reviews: 67,
          badge: null,
          sales: 189
        }
      ]
    },
    {
      id: 'salle-bain-hygiene',
      name: 'Salle de Bain & Hygiène',
      products: [
        {
          id: 19,
          name: "TAPIS DE BAIN ANTI-DÉRAPANT",
          image: "/images/tapis-bain.jpg",
          price: 19.99,
          oldPrice: 28.99,
          discount: 31,
          rating: 4.7,
          reviews: 134,
          badge: "TOP VENTE",
          sales: 456
        },
        {
          id: 20,
          name: "PORTE-SAVON INOX ACRYLIQUE",
          image: "/images/porte-savon.jpg",
          price: 14.99,
          oldPrice: 21.99,
          discount: 32,
          rating: 4.6,
          reviews: 87,
          badge: null,
          sales: 223
        },
        {
          id: 21,
          name: "ROBE DE CHAMBRE COTON BIO",
          image: "/images/robe-chambre.jpg",
          price: 32.99,
          oldPrice: 45.99,
          discount: 28,
          rating: 4.8,
          reviews: 76,
          badge: "LIMITED OFFER",
          sales: 189
        },
        {
          id: 22,
          name: "SERVIETTE DE BAIN ÉPAISSE",
          image: "/images/serviette-bain.jpg",
          price: 24.99,
          oldPrice: 35.99,
          discount: 31,
          rating: 4.7,
          reviews: 98,
          badge: null,
          sales: 312
        },
        {
          id: 23,
          name: "ORGANISATEUR DOUCHE SUSPENDU",
          image: "/images/organisateur-douche.jpg",
          price: 18.99,
          oldPrice: 26.99,
          discount: 30,
          rating: 4.5,
          reviews: 65,
          badge: "TOP VENTE",
          sales: 178
        },
        {
          id: 24,
          name: "BROUSSE DE BAIN NATURELLE",
          image: "/images/brosse-bain.jpg",
          price: 8.99,
          oldPrice: 12.99,
          discount: 31,
          rating: 4.6,
          reviews: 43,
          badge: null,
          sales: 145
        }
      ]
    }
  ];

  // Fonction pour afficher plus de produits
  const showMoreProducts = (categoryId) => {
    setVisibleProducts(prev => ({
      ...prev,
      [categoryId]: prev[categoryId] + 4
    }));
  };

  // Fonction pour tronquer le nom du produit
  const truncateName = (name, maxLength = 30) => {
    return name.length > maxLength ? name.substring(0, maxLength) + '...' : name;
  };

  // Fonction pour générer les étoiles
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half-fill">
              <stop offset="50%" stopColor="currentColor"/>
              <stop offset="50%" stopColor="transparent"/>
            </linearGradient>
          </defs>
          <path fill="url(#half-fill)" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      );
    }

    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-poppins">
            Nos Produits par Catégorie
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez notre sélection de produits de qualité organisés par catégorie
          </p>
        </div>

        {categories.map((category) => (
          <div key={category.id} className="mb-16">
            {/* Titre de la catégorie */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 font-poppins">
                {category.name}
              </h2>
            </div>

            {/* Grille de produits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {category.products.slice(0, visibleProducts[category.id]).map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                >
                  {/* Image du produit avec badges */}
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Badge TOP VENTE */}
                    {product.badge === "TOP VENTE" && (
                      <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
                        TOP VENTE
                      </div>
                    )}
                    
                    {/* Badge LIMITED OFFER */}
                    {product.badge === "LIMITED OFFER" && (
                      <div className="absolute top-3 left-3 bg-black text-white px-2 py-1 rounded-md text-xs font-semibold flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                        </svg>
                        LIMITED OFFER
                      </div>
                    )}
                    
                    {/* Badge de réduction */}
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold">
                      -{product.discount}%
                    </div>
                  </div>

                  {/* Contenu de la card */}
                  <div className="p-4">
                    {/* Nom du produit */}
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                      {truncateName(product.name)}
                    </h3>

                    {/* Disponibilité */}
                    <div className="flex items-center mb-2">
                      <svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-sm text-gray-700">DISPONIBLE</span>
                    </div>

                    {/* Prix */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-red-500">
                            €{product.price.toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-500 line-through ml-2">
                            €{product.oldPrice.toFixed(2)}
                          </span>
                        </div>
                        <div className="text-xs text-red-500 font-semibold">
                          AHORRA {product.discount}%
                        </div>
                      </div>
                    </div>

                    {/* Évaluation */}
                    <div className="mb-3">
                      <div className="flex items-center mb-1">
                        {renderStars(product.rating)}
                        <span className="ml-2 text-sm text-gray-600">
                          Excellent {product.rating} | {product.reviews} Reviews
                        </span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <svg className="w-3 h-3 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"/>
                        </svg>
                        {product.sales}+
                      </div>
                    </div>

                    {/* Boutons d'action */}
                    <div className="flex gap-2">
                      <button className="flex-1 bg-black text-white py-2 px-4 rounded-lg font-semibold text-sm hover:bg-gray-800 transition-colors duration-200">
                        🛒 Acheter maintenant
                      </button>
                      <button className="bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bouton "Voir plus de produits" */}
            {visibleProducts[category.id] < category.products.length && (
              <div className="text-center">
                <button
                  onClick={() => showMoreProducts(category.id)}
                  className="bg-white border-2 border-gray-300 text-gray-700 py-3 px-8 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                >
                  Voir plus de produits ({category.products.length - visibleProducts[category.id]} restants)
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesProducts;
