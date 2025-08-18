export default function Landing(){
  if (typeof window !== "undefined") {
    window.location.replace("/home");
  }
  return null;
}