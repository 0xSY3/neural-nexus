import { ParticleNetwork } from "@particle-network/auth";
import { ParticleProvider } from "@particle-network/provider";

const particle = new ParticleNetwork({
  projectId: "placeholder-project-id",
  clientKey: "placeholder-client-key",
  appId: "placeholder-app-id",
  chainName: "ethereum",
  chainId: 1,
});

const particleProvider = new ParticleProvider(particle.auth);

export { particle, particleProvider };