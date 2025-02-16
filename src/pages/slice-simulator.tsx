import { SliceSimulator } from "@slicemachine/adapter-next/simulator";
import { SliceZone } from "@prismicio/react";

// TODO slices => uncomment when creating slices
// import { components } from "../slices";

export default function SliceSimulatorPage() {
  return (
    <SliceSimulator
      sliceZone={(props) => <SliceZone {...props} /*components={components}*/ />}
    />
  );
}
