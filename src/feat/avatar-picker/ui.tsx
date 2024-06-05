import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {palette} from '../../styles/theme';

interface AvatarPickerProps {
  defaultImageUrl?: string;
  imageUrl?: string;
  style?: ViewStyle;
  size?: number;
  onSelect?: (base64: string) => void;
}

const AvatarPicker: React.FC<AvatarPickerProps> = ({
  defaultImageUrl,
  imageUrl,
  style,
  size = 100,
  onSelect,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    defaultImageUrl || imageUrl,
  );

  useEffect(() => {
    setSelectedImage(imageUrl);
  }, [imageUrl]);

  const pickImage = async () => {
    const response = await launchImageLibrary({
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
      includeBase64: true,
    });

    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      console.log('ImagePicker Error: ', response.errorMessage);
    } else if (response.assets && response.assets.length > 0) {
      const uri = response.assets[0].uri;
      if (uri) {
        setSelectedImage(uri);
      }
      const base64 = response.assets[0].base64;
      if (base64) {
        onSelect?.(base64);
      }
    }
  };

  const styles = createStyles(size);

  return (
    <TouchableOpacity onPress={pickImage}>
      <View style={[styles.container, style]}>
        {selectedImage && (
          <Image source={{uri: selectedImage}} style={styles.avatar} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const createStyles = (size: number) =>
  StyleSheet.create({
    container: {
      width: size,
      height: size,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: size / 2,
      backgroundColor: palette.textSecondary,
    },
    avatar: {
      width: size,
      height: size,
      borderRadius: size / 2,
      borderWidth: 2,
    },
  });

export default AvatarPicker;
