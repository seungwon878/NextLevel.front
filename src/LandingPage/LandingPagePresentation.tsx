import React from 'react';
import {
  Box,
  Input,
  Select,
  Button,
  VStack,
  HStack,
  Text,
  StackDivider,
} from '@chakra-ui/react';

export interface Item {
  id: number;
  section: string;
  title: string;
}

interface Props {
  items: Item[];
  searchText: string;
  onSearchTextChange: (v: string) => void;
  school: string;
  onSchoolChange: (v: string) => void;
  subject: string;
  onSubjectChange: (v: string) => void;
  professor: string;
  onProfessorChange: (v: string) => void;
}

const LandingPagePresentation: React.FC<Props> = ({
  items,
  searchText,
  onSearchTextChange,
  school,
  onSchoolChange,
  subject,
  onSubjectChange,
  professor,
  onProfessorChange,
}) => (
  <HStack align="start" p={8} spacing={6} bg="gray.50">
    {/* Filter Section */}
    <VStack spacing={4} w="25%">
      <Input
        placeholder="검색"
        value={searchText}
        onChange={e => onSearchTextChange(e.target.value)}
      />
      <Select placeholder="학교 선택" value={school} onChange={e => onSchoolChange(e.target.value)}>
        <option value="Section 30">Section 30</option>
        <option value="Section 31">Section 31</option>
        <option value="Section 32">Section 32</option>
      </Select>
      <Select placeholder="과목 선택" value={subject} onChange={e => onSubjectChange(e.target.value)}>
        <option value="CS">CS</option>
        <option value="Math">Math</option>
        <option value="English">English</option>
      </Select>
      <Select placeholder="교수 선택" value={professor} onChange={e => onProfessorChange(e.target.value)}>
        <option value="김철수">김철수</option>
        <option value="이영희">이영희</option>
        <option value="박민수">박민수</option>
      </Select>
      <Button width="100%">→</Button>
      <Button width="100%" colorScheme="teal">업로드</Button>
    </VStack>

    {/* List Section */}
    <Box w="75%" p={4} bg="white" borderRadius="md" boxShadow="sm">
      <VStack divider={<StackDivider />} spacing={4} align="stretch">
        {items.length > 0 ? (
          items.map(item => (
            <HStack key={item.id} justify="space-between">
              <Box>
                <Text fontSize="sm" color="gray.500">{item.section}</Text>
                <Text fontSize="lg" fontWeight="semibold">{item.title}</Text>
              </Box>
              <HStack spacing={2}>
                <Button size="sm">자세히 보기</Button>
                <Button size="sm" colorScheme="teal">채팅</Button>
              </HStack>
            </HStack>
          ))
        ) : (
          <Text textAlign="center" color="gray.500" py={8}>
            조건에 맞는 글이 없습니다.
          </Text>
        )}
      </VStack>
    </Box>
  </HStack>
);

export default LandingPagePresentation;
