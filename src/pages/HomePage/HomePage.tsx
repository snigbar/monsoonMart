import { useAppSelector } from "@/store/hooks/hooks";

export default function HomePage() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div>
      <div>{user?.firstName}</div>
    </div>
  );
}
