import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import BookDetailContainer from '../containers/BookDetailContainer';
import withLoading from '../hocs/withLoading';
import { useTheme } from '@react-navigation/native';
import { selectCommentsForBook } from '../redux/slices/booksSlice';
import { useSelector } from 'react-redux';

// HOC'yi kullanarak DetailScreen bileşenini sarıyoruz
const BookDetailWithLoading = withLoading(BookDetailContainer);

const DetailScreen = ({ route }) => {
  const { book } = route.params; // Kitap bilgilerini route'dan alıyoruz
  const [isLoading, setIsLoading] = useState(true); // Yükleme durumunu yönetmek için state
  const { colors } = useTheme(); // Temayı almak için hook
  const comments = useSelector((state) => selectCommentsForBook(state, book.id)); // Redux'tan kitap için yorumları alıyoruz

  // Sayfa yüklendiğinde veri çekme işlemi simüle ediliyor
  useEffect(() => {
    const loadData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated delay 2 saniye ayarladım
      setIsLoading(false); // Veri yüklendiğinde yükleme durumu kapanıyor
    };

    loadData();
  }, []); // Boş dependency array ile sadece ilk render'da çalışır

  // Yorumları listelemek için renderItem fonksiyonu
  const renderCommentItem = ({ item }) => (
    <View style={[styles.commentContainer, { backgroundColor: colors.card }]}>
      <Text style={[styles.commentText, { color: colors.text }]}>
        {item.text} - <Text style={styles.commentDate}>{new Date(item.date).toLocaleString()}</Text>
      </Text>
    </View>
  );

  return (
    <FlatList
      data={comments}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderCommentItem}
      ListHeaderComponent={(
        <View style={styles.headerContainer}>
          {/* Kitap detayları başlık ve içerik */}
          <Text style={[styles.header, { color: colors.text }]}>Book Details</Text>
          <BookDetailWithLoading isLoading={isLoading} route={route} />
          <Text style={[styles.commentsHeader, { color: colors.text }]}>Comments</Text>
        </View>
      )}
      ListEmptyComponent={(
        <Text style={[styles.noCommentsText, { color: colors.text }]}>No comments available.</Text>
      )}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  commentsHeader: {
    fontSize: 20,
    marginTop: 24,
    fontWeight: 'bold',
  },
  commentContainer: {
    marginVertical: 8,
    padding: 12,
    borderRadius: 5,
  },
  commentText: {
    fontSize: 16,
  },
  commentDate: {
    fontSize: 12,
    color: '#888',
  },
  noCommentsText: {
    marginTop: 12,
    fontSize: 16,
  },
});

export default DetailScreen;
