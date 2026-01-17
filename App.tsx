
import React, { useState, useMemo } from 'react';
import { Country, Company, SearchState } from './types';
import { REGIONS_DATA } from './constants';
import { fetchCompanies, translateQuery } from './services/geminiService';
import * as XLSX from 'xlsx';

// Components
import { SearchIcon, GlobeIcon, MapIcon, DownloadIcon, Loader2, ExternalLinkIcon, AlertCircleIcon, LanguagesIcon, CheckIcon, XIcon, StarIcon, UsersIcon, ShieldCheckIcon } from 'lucide-react';

const App: React.FC = () => {
  const [searchState, setSearchState] = useState<SearchState>({
    query: '',
    country: Country.POLAND,
    selectedRegions: {},
  });
  
  const [results, setResults] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedRegion, setExpandedRegion] = useState<string | null>(null);
  
  // Translation Control Module State
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [suggestedQuery, setSuggestedQuery] = useState('');

  const availableRegions = useMemo(() => REGIONS_DATA[searchState.country], [searchState.country]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchState(prev => ({ ...prev, query: e.target.value }));
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchState({
      query: searchState.query,
      country: e.target.value as Country,
      selectedRegions: {},
    });
    setExpandedRegion(null);
  };

  const toggleSubRegion = (regionId: string, subRegion: string) => {
    setSearchState(prev => {
      const current = prev.selectedRegions[regionId] || [];
      const updated = current.includes(subRegion)
        ? current.filter(s => s !== subRegion)
        : [...current, subRegion];
      
      return {
        ...prev,
        selectedRegions: {
          ...prev.selectedRegions,
          [regionId]: updated
        }
      };
    });
  };

  const handleInitiateSearch = async () => {
    if (!searchState.query.trim()) return;

    // Phase 1: Translation and Control
    setTranslating(true);
    setError(null);
    try {
      const translation = await translateQuery(searchState.query, searchState.country);
      setSuggestedQuery(translation);
      setShowConfirmDialog(true);
    } catch (err) {
      setError("Nie udało się przygotować tłumaczenia. Spróbuj ponownie.");
    } finally {
      setTranslating(false);
    }
  };

  const handleExecuteSearch = async () => {
    setShowConfirmDialog(false);
    setLoading(true);
    setError(null);
    try {
      const flattenedLocations = Object.entries(searchState.selectedRegions).flatMap(([regId, subs]) => {
        const regionName = availableRegions.find(r => r.id === regId)?.name || '';
        const subList = subs as string[];
        return subList.map(sub => `${sub}, ${regionName}`);
      });

      const data = await fetchCompanies(suggestedQuery, searchState.country, flattenedLocations);
      setResults(data);
    } catch (err) {
      setError("Wystąpił błąd podczas pobierania danych. Spróbuj ponownie.");
    } finally {
      setLoading(false);
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(results);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Firmy");
    XLSX.writeFile(workbook, `BazaFirm_${suggestedQuery.replace(/\s+/g, '_')}.xlsx`);
  };

  const isManualCheck = (url: string) => {
    return !url || url.toLowerCase().includes('manual') || url.toLowerCase().includes('ręczn') || url.length < 5;
  };

  const renderRating = (rating?: number, count?: number) => {
    if (rating === undefined || rating === null) {
      return <span className="text-slate-400 italic text-xs">Brak danych</span>;
    }
    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1 justify-center">
          <StarIcon className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span className="font-bold text-slate-900">{rating.toFixed(1)}</span>
        </div>
        {count !== undefined && count !== null && (
          <div className="flex items-center gap-1 text-[10px] text-slate-500 font-medium justify-center">
            <UsersIcon className="w-3 h-3" />
            <span>{count} opinii</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Confirmation Modal */}
      {showConfirmDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-blue-50">
              <h3 className="text-xl font-black text-blue-900 flex items-center gap-3">
                <LanguagesIcon className="w-6 h-6" /> Kontrola Tłumaczenia
              </h3>
              <button onClick={() => setShowConfirmDialog(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <XIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <p className="text-slate-700 font-medium leading-relaxed">
                Dla frazy <span className="font-black text-slate-900">"{searchState.query}"</span> w kraju <span className="font-black text-slate-900">{searchState.country}</span> sugeruję użycie profesjonalnego terminu:
              </p>
              
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Fraza docelowa (możesz edytować):</label>
                <input
                  type="text"
                  className="w-full px-4 py-4 bg-slate-100 border-2 border-blue-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-lg font-bold text-blue-900 shadow-inner"
                  value={suggestedQuery}
                  onChange={(e) => setSuggestedQuery(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                <p className="text-sm text-amber-800 font-medium">
                  Użycie lokalnego języka znacząco poprawia jakość wyników i trafność wyszukiwania firm w Google Maps.
                </p>
              </div>
            </div>
            <div className="p-6 bg-slate-50 flex gap-4">
              <button 
                onClick={() => setShowConfirmDialog(false)}
                className="flex-1 px-6 py-4 rounded-xl font-bold text-slate-600 hover:bg-slate-200 transition-all border border-slate-200"
              >
                Anuluj
              </button>
              <button 
                onClick={handleExecuteSearch}
                className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black text-lg py-4 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2 active:scale-95 transform"
              >
                <CheckIcon className="w-6 h-6" /> Potwierdź i Szukaj
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <GlobeIcon className="text-white w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">BazaFirm <span className="text-blue-600">Pro</span></h1>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-200 text-xs font-bold">
                <ShieldCheckIcon className="w-3 h-3" /> DeepSearch Verified
             </div>
             <div className="text-sm text-slate-500 font-medium hidden md:block">
              Smart Lead Discovery & Website Enrichment
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar / Filters */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <SearchIcon className="w-5 h-5 text-blue-600" /> Konfiguracja Bazy
              </h2>
              
              {/* Search Query */}
              <div className="space-y-2 mb-6">
                <label className="block text-sm font-medium text-slate-700 font-bold">Branża / Produkt (PL)</label>
                <input
                  type="text"
                  placeholder="np. maszyny rolnicze, producenci mebli..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
                  value={searchState.query}
                  onChange={handleQueryChange}
                />
              </div>

              {/* Country Selection */}
              <div className="space-y-2 mb-6">
                <label className="block text-sm font-medium text-slate-700 font-bold">Kraj Docelowy</label>
                <select
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
                  value={searchState.country}
                  onChange={handleCountryChange}
                >
                  <option value={Country.POLAND}>Polska 🇵🇱</option>
                  <option value={Country.GERMANY}>Niemcy 🇩🇪</option>
                  <option value={Country.FRANCE}>Francja 🇫🇷</option>
                  <option value={Country.NETHERLANDS}>Holandia 🇳🇱</option>
                  <option value={Country.BELGIUM}>Belgia 🇧🇪</option>
                  <option value={Country.ITALY}>Włochy 🇮🇹</option>
                  <option value={Country.FINLAND}>Finlandia 🇫🇮</option>
                  <option value={Country.CZECH_REPUBLIC}>Czechy 🇨🇿</option>
                  <option value={Country.SLOVAKIA}>Słowacja 🇸🇰</option>
                  <option value={Country.HUNGARY}>Węgry 🇭🇺</option>
                  <option value={Country.ROMANIA}>Rumunia 🇷🇴</option>
                  <option value={Country.AUSTRIA}>Austria 🇦🇹</option>
                  <option value={Country.LITHUANIA}>Litwa 🇱🇹</option>
                  <option value={Country.LATVIA}>Łotwa 🇱🇻</option>
                </select>
              </div>

              {/* Region Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 flex items-center gap-2 font-bold">
                  <MapIcon className="w-4 h-4" /> Filtruj Regiony
                </label>
                <div className="border border-slate-100 rounded-lg overflow-hidden max-h-[400px] overflow-y-auto shadow-inner bg-slate-50">
                  {availableRegions.map(region => (
                    <div key={region.id} className="border-b border-slate-100 last:border-0">
                      <button
                        onClick={() => setExpandedRegion(expandedRegion === region.id ? null : region.id)}
                        className={`w-full text-left px-4 py-4 flex items-center justify-between transition-all ${expandedRegion === region.id ? 'bg-blue-100 text-blue-800' : 'hover:bg-slate-100'}`}
                      >
                        <span className="font-semibold text-sm">{region.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-white text-blue-600 font-bold px-2 py-0.5 rounded-full shadow-sm border border-blue-200">
                            {searchState.selectedRegions[region.id]?.length || 0}
                          </span>
                          <span className={`transform transition-transform duration-300 ${expandedRegion === region.id ? 'rotate-180' : ''}`}>
                            ▼
                          </span>
                        </div>
                      </button>
                      
                      {expandedRegion === region.id && (
                        <div className="bg-white p-4 space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-2 animate-in slide-in-from-top-4 duration-300 ease-out">
                          {region.subRegions.map(sub => (
                            <label key={sub} className="flex items-center space-x-3 cursor-pointer group p-2 rounded hover:bg-slate-50 transition-colors">
                              <input
                                type="checkbox"
                                className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
                                checked={searchState.selectedRegions[region.id]?.includes(sub) || false}
                                onChange={() => toggleSubRegion(region.id, sub)}
                              />
                              <span className="text-sm text-slate-700 group-hover:text-blue-600 transition-colors">{sub}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleInitiateSearch}
                disabled={loading || translating || !searchState.query}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-black text-lg py-4 px-4 rounded-xl transition-all shadow-xl flex items-center justify-center gap-3 group active:scale-95 transform"
              >
                {translating ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Analiza branży...
                  </>
                ) : loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Weryfikacja WWW...
                  </>
                ) : (
                  <>
                    Generuj Bazę i Strony WWW
                  </>
                )}
              </button>
            </div>
          </aside>

          {/* Results Area */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-xl shadow-md border border-slate-200 flex flex-col min-h-[600px] overflow-hidden">
              <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 bg-white">
                <div>
                  <h3 className="text-xl font-black text-slate-900">Wyniki DeepSearch</h3>
                  <div className="flex flex-col gap-1 mt-1">
                    <p className="text-sm text-slate-500 font-medium italic">Wykorzystano model Gemini 3 Pro dla weryfikacji domen oficjalnych.</p>
                    {results.length > 0 && !loading && (
                      <p className="text-sm text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-md inline-flex self-start border border-blue-100">
                        Znaleziono {results.length} rekordów spełniających kryteria
                      </p>
                    )}
                  </div>
                </div>
                {results.length > 0 && (
                  <button
                    onClick={exportToExcel}
                    className="flex items-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-black transition-all shadow-lg active:scale-95"
                  >
                    <DownloadIcon className="w-5 h-5" /> EKSPORTUJ DO EXCEL
                  </button>
                )}
              </div>

              <div className="flex-grow overflow-x-auto">
                {loading ? (
                  <div className="h-full flex flex-col items-center justify-center space-y-8 p-12 text-center">
                    <div className="relative">
                       <Loader2 className="w-20 h-20 text-blue-600 animate-spin" />
                       <ShieldCheckIcon className="w-8 h-8 text-green-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                    </div>
                    <div className="max-w-sm">
                      <p className="text-xl font-black text-slate-800 mb-2 tracking-tight">Głęboka Weryfikacja WWW</p>
                      <p className="text-sm text-slate-500 mb-6 leading-relaxed">System eliminuje Facebooka, Instagrama i katalogi firm, szukając wyłącznie oficjalnych stron docelowych.</p>
                      <div className="space-y-1 text-slate-500 text-xs font-bold uppercase tracking-widest text-left">
                        <p className="flex items-center gap-2 animate-pulse"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> Przeszukiwanie rejestrów firm...</p>
                        <p className="flex items-center gap-2 animate-pulse delay-150"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> Weryfikacja lokalizacji w Maps...</p>
                        <p className="flex items-center gap-2 animate-pulse delay-300"><div className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Precyzyjne szukanie domen WWW...</p>
                        <p className="flex items-center gap-2 animate-pulse delay-500"><div className="w-1.5 h-1.5 bg-red-500 rounded-full" /> Blokowanie linków Social Media...</p>
                      </div>
                    </div>
                  </div>
                ) : results.length > 0 ? (
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-200">
                        <th className="px-6 py-5 text-left text-xs font-black text-slate-600 uppercase tracking-widest">Podmiot</th>
                        <th className="px-6 py-5 text-left text-xs font-black text-slate-600 uppercase tracking-widest">Kontakt</th>
                        <th className="px-6 py-5 text-left text-xs font-black text-slate-600 uppercase tracking-widest">Lokalizacja</th>
                        <th className="px-6 py-5 text-left text-xs font-black text-slate-600 uppercase tracking-widest text-center">Opinie Google</th>
                        <th className="px-6 py-5 text-left text-xs font-black text-slate-600 uppercase tracking-widest">Strona WWW</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {results.map((company, idx) => (
                        <tr key={idx} className="hover:bg-blue-50/50 transition-all group">
                          <td className="px-6 py-5 font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-tight">{company.name}</td>
                          <td className="px-6 py-5">
                            <div className="text-sm font-bold text-slate-800">{company.phone}</div>
                          </td>
                          <td className="px-6 py-5 text-slate-600 text-xs leading-relaxed max-w-[200px]">{company.address}</td>
                          <td className="px-6 py-5 text-center align-middle">
                            {renderRating(company.rating, company.reviewCount)}
                          </td>
                          <td className="px-6 py-5">
                            {isManualCheck(company.website) ? (
                              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-[10px] font-black border border-amber-200">
                                <AlertCircleIcon className="w-3 h-3" />
                                BRAK WWW / SOCIAL
                              </div>
                            ) : (
                              <a href={company.website.startsWith('http') ? company.website : `https://${company.website}`} 
                                 target="_blank" rel="noopener noreferrer" 
                                 className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-900 font-black text-xs transition-all group/link bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                                <span className="truncate max-w-[120px]">{company.website.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}</span>
                                <ExternalLinkIcon className="w-3.5 h-3.5 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform shrink-0" />
                              </a>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center p-16 text-center">
                    {error ? (
                      <div className="max-w-md mx-auto space-y-6">
                        <div className="bg-red-50 text-red-600 p-8 rounded-2xl border-2 border-red-100 shadow-sm">
                          <p className="font-black text-xl mb-2">Błąd Operacji</p>
                          <p className="text-sm font-medium">{error}</p>
                        </div>
                        <button onClick={handleInitiateSearch} className="px-6 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-black transition-all">Ponów Próbę</button>
                      </div>
                    ) : (
                      <div className="space-y-6 opacity-25 grayscale group">
                        <GlobeIcon className="w-32 h-32 mx-auto text-slate-400 group-hover:scale-110 transition-transform duration-700" />
                        <div>
                          <p className="text-2xl font-black text-slate-800 tracking-tight">System Gotowy</p>
                          <p className="text-slate-600 font-medium">Uzupełnij parametry szukania w panelu bocznym.</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6 opacity-50">
            <GlobeIcon className="w-6 h-6 text-blue-600" />
            <span className="text-lg font-black tracking-tight">BazaFirm Pro <small className="text-xs font-medium">v2.5 Precise URLs</small></span>
          </div>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed font-medium">
            System wykorzystuje zaawansowany algorytm 4-stopniowej weryfikacji: Map Grounding, Global Web Search, 
            Strict Domain Filtering (Gemini 3 Pro) oraz strukturyzację JSON. 
            Napędzane przez Google Gemini™ i API Google Search.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
