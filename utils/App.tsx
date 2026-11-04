import { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { supabase } from './utils/supabase';

type Diagnoza = { id: number; emri: string; pershkrimi: string | null };

export default function App() {
  const [diagnozat, setDiagnozat] = useState<Diagnoza[]>([]);
  const [gabim, setGabim] = useState<string | null>(null);

  useEffect(() => {
    async function merr() {
      const { data, error } = await supabase.from('diagnozat').select('*');
      if (error) setGabim(error.message);
      else setDiagnozat(data ?? []);
    }
    merr();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulli}>Syri</Text>
      {gabim && <Text style={styles.gabim}>Gabim: {gabim}</Text>}
      <FlatList
        data={diagnozat}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.karta}>
            <Text style={styles.emri}>{item.emri}</Text>
            <Text>{item.pershkrimi}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 16 },
  titulli: { fontSize: 28, fontWeight: 'bold', marginBottom: 16 },
  karta: { padding: 12, marginBottom: 8, borderRadius: 8, backgroundColor: '#eef' },
  emri: { fontWeight: '600', fontSize: 16 },
  gabim: { color: 'red', marginBottom: 8 },
});
