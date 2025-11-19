import { AppState } from './types';

export const INITIAL_STATE: AppState = {
  profile: {
    name: "@AlexCreador",
    bio: "🎨 Artista Digital & Creador de Contenido. ¡Accede a mis recursos exclusivos aquí abajo!",
    avatarUrl: "https://picsum.photos/id/64/200/200",
    backgroundImageUrl: "https://picsum.photos/id/193/800/1200",
    backgroundAudioUrl: null,
    overlayOpacity: 40,
    fontFamily: 'Inter',
    fontSize: 'md',
    linkFontSize: 'md',
  },
  links: [
    {
      id: '1',
      title: '🛒 Comprar Pack de Presets',
      url: 'https://stripe.com', 
      isActive: true,
      type: 'direct',
    },
    {
      id: '2',
      title: '🎟️ Curso Exclusivo (Oferta)',
      url: 'https://youtube.com',
      isActive: true,
      type: 'service',
      description: 'Aprende a editar fotos como un profesional en este curso intensivo de 4 horas. Incluye material descargable, acceso a la comunidad privada y certificado de finalización. \n\n¡Precio especial por tiempo limitado!',
      buttonText: 'Inscribirme por $29'
    },
    {
      id: '3',
      title: '☕ Asesoría 1:1',
      url: 'https://calendly.com',
      isActive: true,
      type: 'service',
      description: 'Reserva una sesión privada de 45 minutos conmigo. Revisaremos tu portafolio, te daré feedback personalizado y trazaremos un plan de acción para tu crecimiento en redes sociales.',
      buttonText: 'Reservar Asesoría'
    },
    {
      id: '4',
      title: '🛍️ Mis Productos',
      url: 'https://shopify.com',
      isActive: true,
      type: 'service',
      description: 'Explora mi colección de merchandise oficial y productos digitales.\n\n• Camisetas de edición limitada\n• Ebooks de fotografía\n• Stickers y accesorios\n\nEnvíos a todo el mundo 🌍',
      buttonText: 'Ver Tienda y Pagar'
    },
  ],
};