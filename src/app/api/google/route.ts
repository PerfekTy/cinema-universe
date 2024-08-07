export const POST = async () => {
  try {
    await signIn("google");
  } catch (error) {}
};
