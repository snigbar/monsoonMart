import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { authenticate } from "@/store/slices/AuthSlice/auth.slice";

export default function HomePage() {
  const isAuhthenticated = useAppSelector((state) => state.auth.isLoggedIn);

  const dispatch = useAppDispatch();

  return (
    <div>
      <p>isLoggedIn: {isAuhthenticated.toString()}</p>
      <button
        onClick={() => dispatch(authenticate())}
        className="p-2 bg-rose-200"
      >
        authenticate
      </button>
    </div>
  );
}
