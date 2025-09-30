import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../../contexts/AuthContext';

const ProfileScreen = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Çıkış Yap',
      'Çıkış yapmak istediğinizden emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        { text: 'Çıkış Yap', onPress: logout, style: 'destructive' },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          {user?.avatar ? (
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Icon name="person" size={48} color="#FFFFFF" />
            </View>
          )}
        </View>
        <Text style={styles.name}>{user?.name || user?.username}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hesap</Text>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="person-circle-outline" size={24} color="#FFFFFF" />
          <Text style={styles.menuText}>Profili Düzenle</Text>
          <Icon name="chevron-forward" size={20} color="#B3B3B3" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="key-outline" size={24} color="#FFFFFF" />
          <Text style={styles.menuText}>Şifre Değiştir</Text>
          <Icon name="chevron-forward" size={20} color="#B3B3B3" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="notifications-outline" size={24} color="#FFFFFF" />
          <Text style={styles.menuText}>Bildirimler</Text>
          <Icon name="chevron-forward" size={20} color="#B3B3B3" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tercihler</Text>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="musical-note-outline" size={24} color="#FFFFFF" />
          <Text style={styles.menuText}>Ses Kalitesi</Text>
          <Icon name="chevron-forward" size={20} color="#B3B3B3" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="download-outline" size={24} color="#FFFFFF" />
          <Text style={styles.menuText}>İndirmeler</Text>
          <Icon name="chevron-forward" size={20} color="#B3B3B3" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="language-outline" size={24} color="#FFFFFF" />
          <Text style={styles.menuText}>Dil</Text>
          <View style={styles.menuItemRight}>
            <Text style={styles.menuItemValue}>Türkçe</Text>
            <Icon name="chevron-forward" size={20} color="#B3B3B3" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hakkında</Text>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="help-circle-outline" size={24} color="#FFFFFF" />
          <Text style={styles.menuText}>Yardım & Destek</Text>
          <Icon name="chevron-forward" size={20} color="#B3B3B3" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="document-text-outline" size={24} color="#FFFFFF" />
          <Text style={styles.menuText}>Gizlilik Politikası</Text>
          <Icon name="chevron-forward" size={20} color="#B3B3B3" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="information-circle-outline" size={24} color="#FFFFFF" />
          <Text style={styles.menuText}>Hakkımızda</Text>
          <View style={styles.menuItemRight}>
            <Text style={styles.menuItemValue}>v1.0.0</Text>
            <Icon name="chevron-forward" size={20} color="#B3B3B3" />
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="log-out-outline" size={24} color="#FF3B30" />
        <Text style={styles.logoutText}>Çıkış Yap</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Witly Music © 2025</Text>
        <Text style={styles.footerText}>Made with ❤️ by Witly Design</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    alignItems: 'center',
    padding: 24,
    paddingTop: 48,
    backgroundColor: '#1DB954',
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#282828',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#B3B3B3',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#282828',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 16,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemValue: {
    fontSize: 14,
    color: '#B3B3B3',
    marginRight: 8,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#282828',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 32,
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF3B30',
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    padding: 24,
    marginTop: 16,
  },
  footerText: {
    fontSize: 12,
    color: '#808080',
    marginTop: 4,
  },
});

export default ProfileScreen;
