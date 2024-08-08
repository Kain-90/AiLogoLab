const env: { [key: string]: string | undefined } = {
  NEXT_PUBLIC_BACKEND_BASE_URL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
  NEXT_PUBLIC_TEXT_TO_IMAGE_MODEL: process.env.NEXT_PUBLIC_TEXT_TO_IMAGE_MODEL,
};
const requiredEnvVars = ['NEXT_PUBLIC_BACKEND_BASE_URL'];

requiredEnvVars.map((envVar) => {
  if (env[envVar] === undefined) {
    throw new Error(`Environment variable ${envVar} is required`);
  }
});

export class Config {
  static BACKEND_BASE_URL =
    typeof process.env.NEXT_PUBLIC_BACKEND_BASE_URL !== undefined &&
    process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

  static TEXT_TO_IMAGE_MODEL =
    typeof process.env.NEXT_PUBLIC_TEXT_TO_IMAGE_MODEL !== undefined &&
    process.env.NEXT_PUBLIC_TEXT_TO_IMAGE_MODEL;
}
