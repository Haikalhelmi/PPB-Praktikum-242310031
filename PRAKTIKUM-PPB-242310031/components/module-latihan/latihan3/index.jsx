// Praktikum2.jsx
// RFC (React Functional Component) - Evaluasi Berat Badan Ideal

import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

// ============================================================
// KOMPONEN UTAMA - Praktikum 2
// ============================================================
const index = () => {
  // ----------------------------------------------------------
  // 1. Data diri dalam bentuk object
  // ----------------------------------------------------------
  const dataDiri = {
    nama: "Kal",
    beratBadan: 62, // dalam kg
    tinggiBadan: 165, // dalam cm
  };

  // ----------------------------------------------------------
  // 2. Data porsi makanan harian dalam bentuk array of object
  // ----------------------------------------------------------
  const porsiMakananHarian = [
    { waktuMakan: "Sarapan", kalori: 400 },
    { waktuMakan: "Makan Siang", kalori: 600 },
    { waktuMakan: "Makan Malam", kalori: 500 },
    { waktuMakan: "Camilan", kalori: 300 },
  ];

  // ----------------------------------------------------------
  // 3. Menghitung total kalori harian menggunakan looping
  // ----------------------------------------------------------
  let totalKalori = 0;
  for (let i = 0; i < porsiMakananHarian.length; i++) {
    totalKalori += porsiMakananHarian[i].kalori;
  }

  // ----------------------------------------------------------
  // 4. Konversi tinggi badan dari centimeter ke meter
  // ----------------------------------------------------------
  const tinggiBadanMeter = dataDiri.tinggiBadan / 100;

  // ----------------------------------------------------------
  // 5. Menghitung BMI (Body Mass Index)
  //    Rumus: BMI = berat badan (kg) / (tinggi badan (m))^2
  // ----------------------------------------------------------
  const bmi = dataDiri.beratBadan / (tinggiBadanMeter * tinggiBadanMeter);
  const bmiFormatted = bmi.toFixed(2);

  // ----------------------------------------------------------
  // 6. Menentukan status BMI menggunakan percabangan
  //    < 18.5        : Kurus (Underweight)
  //    18.5 - 24.9   : Ideal (Normal)
  //    >= 25         : Berlebih (Overweight)
  // ----------------------------------------------------------
  let statusBMI;
  if (bmi < 18.5) {
    statusBMI = "Kurus";
  } else if (bmi >= 18.5 && bmi < 25) {
    statusBMI = "Ideal";
  } else {
    statusBMI = "Berlebih";
  }

  // ----------------------------------------------------------
  // 7. Menentukan kategori asupan kalori harian menggunakan percabangan
  //    Acuan kebutuhan kalori harian dewasa rata-rata: 2000 kalori
  //    < 1500       : Kurang
  //    1500 - 2500  : Cukup
  //    > 2500       : Berlebih
  // ----------------------------------------------------------
  let statusKalori;
  if (totalKalori < 1500) {
    statusKalori = "Asupan kalori kurang";
  } else if (totalKalori >= 1500 && totalKalori <= 2500) {
    statusKalori = "Asupan kalori cukup";
  } else {
    statusKalori = "Asupan kalori berlebih";
  }

  // ----------------------------------------------------------
  // 8. Logika kesimpulan evaluasi BMI vs Asupan Kalori
  // ----------------------------------------------------------
  let kesimpulan;
  if (statusBMI === "Ideal" && statusKalori === "Asupan kalori cukup") {
    kesimpulan = "Berat badan sudah ideal dan asupan kalori sesuai.";
  } else if (statusBMI === "Ideal" && statusKalori === "Asupan kalori kurang") {
    kesimpulan = "Berat badan ideal, namun asupan kalori perlu ditingkatkan.";
  } else if (
    statusBMI === "Ideal" &&
    statusKalori === "Asupan kalori berlebih"
  ) {
    kesimpulan =
      "Berat badan ideal, tetapi asupan kalori terlalu tinggi. Perhatikan pola makan.";
  } else if (statusBMI === "Kurus" && statusKalori === "Asupan kalori kurang") {
    kesimpulan =
      "Berat badan kurang dan asupan kalori rendah. Tingkatkan asupan makanan bergizi.";
  } else if (statusBMI === "Kurus" && statusKalori === "Asupan kalori cukup") {
    kesimpulan =
      "Berat badan kurang meski kalori cukup. Konsultasikan dengan ahli gizi.";
  } else if (
    statusBMI === "Berlebih" &&
    statusKalori === "Asupan kalori berlebih"
  ) {
    kesimpulan =
      "Berat badan berlebih dan asupan kalori tinggi. Kurangi kalori dan perbanyak olahraga.";
  } else if (
    statusBMI === "Berlebih" &&
    statusKalori === "Asupan kalori cukup"
  ) {
    kesimpulan =
      "Berat badan berlebih. Pertimbangkan program diet sehat dan konsultasi dokter.";
  } else {
    kesimpulan =
      "Evaluasi lebih lanjut diperlukan. Konsultasikan dengan tenaga medis.";
  }

  // ----------------------------------------------------------
  // 9. Tampilan aplikasi menggunakan komponen Text & View
  // ----------------------------------------------------------
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* ---- Semua Data dalam Satu Card ---- */}
        <View style={styles.card}>
          {/* Header */}
          <Text style={styles.cardTitle}>Evaluasi Berat Badan Ideal</Text>
          <View style={styles.divider} />

          {/* Pasien */}
          <Text style={styles.cardTitle}>Pasien</Text>
          <Text style={styles.cardText}>Nama: {dataDiri.nama}</Text>
          <Text style={styles.cardText}>
            Berat Badan: {dataDiri.beratBadan} kg
          </Text>
          <Text style={styles.cardText}>
            Tinggi Badan: {dataDiri.tinggiBadan} cm
          </Text>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Porsi Makanan Harian */}
          <Text style={styles.cardTitle}>Porsi Makanan Harian</Text>
          {porsiMakananHarian.map((item, index) => (
            <Text key={index} style={styles.cardText}>
              {item.waktuMakan} - {item.kalori} kalori
            </Text>
          ))}
          <View style={styles.divider} />
          <Text style={styles.cardTextBold}>
            Total Kalori: {totalKalori} kalori
          </Text>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Hasil Perhitungan */}
          <Text style={styles.cardTitle}>Hasil Perhitungan</Text>
          <Text style={styles.cardText}>BMI: {bmiFormatted}</Text>
          <Text style={styles.cardText}>Status BMI: {statusBMI}</Text>
          <Text style={styles.cardText}>Status Kalori: {statusKalori}</Text>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Kesimpulan */}
          <Text style={styles.cardText}>{kesimpulan}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// ============================================================
// STYLESHEET
// ============================================================
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  container: {
    padding: 16,
    paddingBottom: 32,
  },

  // Card
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    color: "#555555",
    marginBottom: 4,
    lineHeight: 22,
  },
  cardTextBold: {
    fontSize: 14,
    color: "#2E86AB",
    fontWeight: "bold",
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginVertical: 8,
  },
});

export default index;
