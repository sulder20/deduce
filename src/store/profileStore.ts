import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Profile, Archive } from '@/content/types';

interface ProfileState {
  profile: Profile | null;
  archives: Archive[];
  
  createProfile: (nickname: string, avatarColor: string) => void;
  saveArchive: (archive: Archive) => void;
  deleteArchive: (archiveId: string) => void;
  clearProfile: () => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: null,
      archives: [],

      createProfile: (nickname, avatarColor) => set({
        profile: {
          id: `local-${Date.now()}`,
          nickname,
          avatarColor,
          createdAt: new Date().toISOString(),
        }
      }),

      saveArchive: (archive) => set((state) => {
        // 覆盖同 ID 的旧档案
        const filtered = state.archives.filter(a => a.archiveId !== archive.archiveId);
        return { archives: [archive, ...filtered] };
      }),

      deleteArchive: (archiveId) => set((state) => ({
        archives: state.archives.filter(a => a.archiveId !== archiveId)
      })),

      clearProfile: () => set({ profile: null, archives: [] }),
    }),
    {
      name: 'deduce-storage',
    }
  )
);