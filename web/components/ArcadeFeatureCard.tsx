import { useRouter } from "next/navigation";
export function ArcadeFeatureCard({
  title,
  description,
  icon,
  route,
}: {
  title: string;
  description: string;
  icon: string;
  route: string;
}) {
  const router = useRouter();
  return (
    <div className="arcade-card" onClick={() => router.push(route)}>
      <div className="card-icon">{icon}</div>
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
    </div>
  );
}
