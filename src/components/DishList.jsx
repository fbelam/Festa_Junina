import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import DishCard from './DishCard';
import NameModal from './NameModal';
import './DishList.css';

const DishList = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDish, setSelectedDish] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchDishes();

    const channel = supabase
      .channel('public:pratos_festa_junina')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'pratos_festa_junina' }, (payload) => {
        handleRealtimeChange(payload);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchDishes = async () => {
    try {
      const { data, error } = await supabase
        .from('pratos_festa_junina')
        .select('*')
        .order('nome_prato', { ascending: true });
      
      if (error) throw error;
      setDishes(data || []);
    } catch (error) {
      console.error('Error fetching dishes:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRealtimeChange = (payload) => {
    if (payload.eventType === 'UPDATE') {
      setDishes((currentDishes) =>
        currentDishes.map((dish) =>
          dish.id === payload.new.id ? payload.new : dish
        )
      );
    } else if (payload.eventType === 'INSERT') {
      setDishes((currentDishes) => {
        const newDishes = [...currentDishes, payload.new];
        return newDishes.sort((a, b) => a.nome_prato.localeCompare(b.nome_prato));
      });
    } else if (payload.eventType === 'DELETE') {
      setDishes((currentDishes) => currentDishes.filter(dish => dish.id !== payload.old.id));
    }
  };

  const handleSelectClick = (dish) => {
    if (dish.selecionado) return;
    setSelectedDish(dish);
    setIsModalOpen(true);
  };

  const handleConfirmName = async (name) => {
    if (!selectedDish || !name.trim()) return;

    try {
      const { error } = await supabase
        .from('pratos_festa_junina')
        .update({ 
          trazido_por: name.trim(), 
          selecionado: true 
        })
        .eq('id', selectedDish.id);

      if (error) throw error;
      
      setDishes(currentDishes => 
        currentDishes.map(d => 
          d.id === selectedDish.id 
            ? { ...d, trazido_por: name.trim(), selecionado: true } 
            : d
        )
      );

    } catch (error) {
      console.error('Error updating dish:', error.message);
      alert('Erro ao confirmar o prato. Tente novamente.');
    } finally {
      setIsModalOpen(false);
      setSelectedDish(null);
    }
  };

  if (loading) {
    return <div className="loading">Carregando as delícias... 🌽</div>;
  }

  return (
    <div className="dish-list-container">
      <h2 className="section-title">O que vai ter de bom?</h2>
      <div className="dish-grid">
        {dishes.map((dish) => (
          <DishCard 
            key={dish.id} 
            dish={dish} 
            onSelect={() => handleSelectClick(dish)} 
          />
        ))}
      </div>
      
      {isModalOpen && (
        <NameModal 
          dishName={selectedDish?.nome_prato}
          onConfirm={handleConfirmName}
          onCancel={() => {
            setIsModalOpen(false);
            setSelectedDish(null);
          }}
        />
      )}
    </div>
  );
};

export default DishList;
