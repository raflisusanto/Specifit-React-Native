import { Text } from "react-native";
import { TIPS } from "../../../data/dummy-data";

function TipsScreen({route}) {
  const tipsId = route.params.tipsId;
  const selectedTips = TIPS.find((tips) => tips.id === tipsId);
  return <Text style={{marginTop: 100}}>Ini di tips {selectedTips.title}</Text>;
}

export default TipsScreen;
