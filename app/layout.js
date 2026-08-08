import "./globals.css";

export const metadata = {
  title: "Gestor de publicaciones · Radar de Opinión LinkedIn",
  description:
    "Crea, programa y ordena los artículos de opinión de la serie de autoridad en LinkedIn de Miracle AI.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
