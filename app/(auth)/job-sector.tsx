// import React, { useMemo, useState } from "react";
// import {
//   Text,
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   View,
//   TouchableOpacity,
//   FlatList,
//   Image,
// } from "react-native";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import jobs from "../lib/constants/data";
// import SingleJob from "@/components/SingleJob";
// import { useRouter } from "expo-router";
// import JobSearch from "@/components/JobSearch";


// const JobSector = () => {
//   const router = useRouter();

//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [filteredJobs, setFilteredJobs] =
//     useState<Array<(typeof jobs)[number]>>(jobs);
//   const handleChangeText = (searchTerm: string) => {
//     setSearchTerm(searchTerm);
//   };

//   useMemo(() => {
//     const filtered = jobs.filter((job) =>
//       job.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredJobs(filtered);
//   }, [searchTerm]);

//   return (
//     <View className="flex-1 bg-backgr-100">
//       <StatusBar hidden={true} backgroundColor="#000" barStyle="dark-content" />
//       <View className="relative">
//         <Image
//           source={require("@/assets/images/jobhead.png")}
//           className="w-full h-36"
//           resizeMode="cover"
//         />
//         <TouchableOpacity
//           className="bg-white absolute p-2 top-8 left-8 z-20 rounded-full"
//           style={{
//             shadowOffset: {
//               width: 0,
//               height: 2,
//             },
//             shadowOpacity: 0.25,
//             shadowRadius: 3.84,
//             elevation: 5,
//           }}
//           onPress={() => router.back()}
//         >
//           <Ionicons name="arrow-back" size={32} color="#0061FF" />
//         </TouchableOpacity>
//       </View>
//       <View className="px-6 py-4 flex-row items-center z-20">
//         <View className="flex-1 items-center">
//           <Text className="text-3xl font-rubik-bold text-gray-900">
//             Choisir mon métier
//           </Text>
//           <Text className="text-ls font-rubik-regular text-gray-500 mt-1">
//             Explorez les possibilités
//           </Text>
//         </View>
//       </View>
//       <JobSearch searchTerm={searchTerm} handleChangeText={handleChangeText} />
//       <View className="flex-1 items-center">
//         {/* <Text className="text-6xl font-rubik-bold my-6">Mon metier</Text> */}
//         <View className="flex-1">
//           <FlatList
//             data={filteredJobs}
//             keyExtractor={(item) => item.id}
//             renderItem={({ item, index }) => <SingleJob item={item} index={index} />}
//             numColumns={2}
//             columnWrapperStyle={{
//               justifyContent: "space-between",
//               gap: 10,
//               marginBottom: 10,
//               marginHorizontal: 20,
//               marginTop: 20,
//             }}
//             contentContainerStyle={{ flexGrow: 1 }}
//           />
//         </View>
//       </View>
//     </View>
//   );
// };

// export default JobSector;
