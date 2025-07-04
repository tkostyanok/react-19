type TGender = 'male' | 'female';

export interface IMarvelHeroesData {
  nameLabel: string | null,
  genderLabel: TGender | null,
  citizenshipLabel: string | null,
  skillsLabel: string | null,
  occupationLabel: string | null,
  memberOfLabel: string | null,
  creatorLabel: string | null
}

export interface ISubTask {
  id: number;
  title: string;
  isCompleted: boolean;
  note?: string;
}

export interface ITestTask1 {
  id: number;
  isCompleted: boolean;
  linkToMUI?: string;
  subTasks: ISubTask[];
  task: string;

}