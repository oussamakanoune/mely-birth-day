export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  durationSec: number;
  src: string | null;
  isPlayable: boolean; // false for Ray'a per master prompt rules
  theme: {
    gradient: string;
    iconType: 'cosmic' | 'tower' | 'sunset' | 'ammoniaque' | 'clouds' | 'lantern' | 'palace' | 'moon' | 'aurora';
  };
  note?: string;
}

export const BIRTHDAY_PLAYLIST: Track[] = [
  {
    id: 'track-1',
    title: 'Uranus',
    artist: 'PNL',
    duration: '3:45',
    durationSec: 225,
    src: 'audio/Uranus(256k) (1).mp3',
    isPlayable: true,
    theme: {
      gradient: 'from-purple-950 via-indigo-900 to-pink-950',
      iconType: 'cosmic'
    },
    note: 'Background track & playlist entry — PNL Uranus'
  },
  {
    id: 'track-2',
    title: "J'oublie tout",
    artist: 'Jul',
    duration: '3:30',
    durationSec: 210,
    src: 'audio/Jul_-_J_oublie_tout_[Son_Officiel](256k) (1).mp3',
    isPlayable: true,
    theme: {
      gradient: 'from-blue-950 via-slate-900 to-violet-950',
      iconType: 'tower'
    }
  },
  {
    id: 'track-3',
    title: 'Despacito',
    artist: 'Luis Fonsi',
    duration: '3:48',
    durationSec: 228,
    src: 'audio/Luis_Fonsi_-_Despacito_ft._Daddy_Yankee(256k) (1).mp3',
    isPlayable: true,
    theme: {
      gradient: 'from-rose-950 via-purple-950 to-amber-950',
      iconType: 'sunset'
    }
  },
  {
    id: 'track-4',
    title: "À l'ammoniaque",
    artist: 'PNL',
    duration: '5:16',
    durationSec: 316,
    src: 'audio/PNL_-_A_l_Ammoniaque_[Clip_Officiel](256k).mp3',
    isPlayable: true,
    theme: {
      gradient: 'from-violet-950 via-fuchsia-950 to-slate-950',
      iconType: 'ammoniaque'
    }
  },
  {
    id: 'track-5',
    title: 'Sometimes It Is Hard to Face Reality',
    artist: 'Unknown',
    duration: '3:20',
    durationSec: 200,
    src: 'audio/Poo_Bear_ft_Justin_Bieber_Jay_Electronica_Hard_2_Face_Reality_Lyric.mp3',
    isPlayable: true,
    theme: {
      gradient: 'from-slate-900 via-indigo-950 to-pink-950',
      iconType: 'clouds'
    },
    note: 'Metadata preserved exactly per prompt specification'
  },
  {
    id: 'track-6',
    title: 'ضيعت عليه العمر يبويا',
    artist: 'Unknown',
    duration: '4:15',
    durationSec: 255,
    src: 'audio/Abdel_Halim_Hafez_Ala_Hesb_Wedad_عبد_الحليم_حافظ_على_حسب_وداد_قلبى256k.mp3',
    isPlayable: true,
    theme: {
      gradient: 'from-amber-950 via-orange-950 to-purple-950',
      iconType: 'lantern'
    },
    note: 'Arabic title and metadata preserved exactly per prompt specification'
  },
  {
    id: 'track-7',
    title: 'Meleğim',
    artist: 'Soolking feat. Dadju',
    duration: '3:40',
    durationSec: 220,
    src: 'audio/Soolking_feat_Dadju_Meleğim_Clip_Officiel_Prod_by_Nyadjiko256k.mp3',
    isPlayable: true,
    theme: {
      gradient: 'from-fuchsia-950 via-purple-950 to-indigo-950',
      iconType: 'palace'
    },
    note: 'Official reference: https://www.youtube.com/watch?v=ReK5Z0RCbSY'
  },
  {
    id: 'track-8',
    title: "Ray'a",
    artist: 'Amr Diab',
    duration: '3:58',
    durationSec: 238,
    src: null,
    isPlayable: false, // Strict requirement: clicking must not start audio; visually identical
    theme: {
      gradient: 'from-indigo-950 via-violet-950 to-rose-950',
      iconType: 'moon'
    },
    note: 'Clicking does not start audio; card appears visually identical to other entries'
  },
  {
    id: 'track-9',
    title: 'La misère est si belle',
    artist: 'PNL',
    duration: '5:04',
    durationSec: 304,
    src: 'audio/PNL_-_La_misère_est_si_belle__Clip_Vidéo_(256k).mp3',
    isPlayable: true,
    theme: {
      gradient: 'from-rose-950 via-purple-950 to-indigo-950',
      iconType: 'aurora'
    },
    note: 'Deux Frères — PNL'
  }
];
