import styled from 'styled-components';
import { Logo } from './Logo';
import { useState, useEffect } from 'react';
import { useData } from '../providers/DataProvider';

const API_URL = 'https://rickandmortyapi.com/api/character/';

export function Header() {
  const { setApiURL, activePage, setActivePage } = useData();
  const [filters, setFilters] = useState({
    name: '',
    status: '',
    species: '',
    type: '',
    gender: '',
    page: ''
  });

  function updateUrl(newFilters = filters) {
    const params = new URLSearchParams();

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });

    if (activePage >= 1) {
      params.set('page', activePage + 1);
    } else {
      params.delete('page');
    }

    const fullUrl = `${API_URL}?${params.toString()}`;
    setApiURL(fullUrl);
    window.history.replaceState(
      null,
      '',
      params.toString() ? `?${params.toString()}` : params.toString()
    );
  }

  useEffect(() => {
    const currentUrlParams = new URLSearchParams(window.location.search);
    const initialFilters = {};

    for (const [key, value] of currentUrlParams.entries()) {
      if (filters.hasOwnProperty(key)) {
        initialFilters[key] = value;
      }
    }

    setFilters((prevFilters) => ({ ...prevFilters, ...initialFilters }));
    updateUrl(initialFilters);
    if (initialFilters.page) {
      setActivePage(Number(initialFilters.page - 1));
    }
  }, []);

  useEffect(() => {
    updateUrl();
  }, [filters, activePage, setActivePage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  return (
    <HeaderContainer>
      <Logo />
      <FilterContainer>
        <Input
          type="text"
          placeholder="Имя"
          name="name"
          value={filters.name}
          onChange={handleChange}
        />
        <Select value={filters.status} name="status" onChange={handleChange}>
          <option value="">Статус</option>
          <option value="alive">Живой</option>
          <option value="dead">Мёртвый</option>
          <option value="unknown">Неизвестно</option>
        </Select>
        <Input
          type="text"
          name="species"
          placeholder="Вид"
          value={filters.species}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Тип"
          name="type"
          value={filters.type}
          onChange={handleChange}
        />
        <Select value={filters.gender} name="gender" onChange={handleChange}>
          <option value="">Пол</option>
          <option value="male">Мужской</option>
          <option value="female">Женский</option>
          <option value="genderless">Без пола</option>
          <option value="unknown">Неизвестно</option>
        </Select>
      </FilterContainer>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border: 2px solid #4caf50;
  border-radius: 5px;
  background-color: #ffffff;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  font-size: 14px;
  color: #333;

  &:focus {
    outline: none;
    border-color: #ff5722;
  }
`;

const Select = styled.select`
  padding: 10px;
  border: 2px solid #4caf50;
  border-radius: 5px;
  background-color: #ffffff;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  font-size: 14px;
  color: #333;

  &:focus {
    outline: none;
    border-color: #ff5722;
  }
`;
