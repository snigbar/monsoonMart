import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { authenticate } from "@/store/slices/userSlice/user.slice";

export default function HomePage() {
  const isAuhthenticated = useAppSelector(
    (state) => state.user.isAuhthenticated,
  );

  const dispatch = useAppDispatch();
  console.log(isAuhthenticated);

  return (
    <div>
      <p>authenticate: {isAuhthenticated.toString()}</p>
      <button
        onClick={() => dispatch(authenticate())}
        className="p-2 bg-rose-200"
      >
        authenticate
      </button>
    </div>
  );
}
