#!/bin/env ruby
# frozen_string_literal: true

require 'every_politician_scraper/scraper_data'
require 'pry'

class MemberList
  class Member
    def name
      parts.last.tidy.gsub(/\s*\.$/, '').gsub(/^(Dona|Don|Doña)[,.]?\s*/, '')
    end

    def position
      parts.first.tidy.gsub(/^\d+[,\.\- ]*/, '').gsub(/\s*[,.]$/, '')
    end

    field :gender do
      return 'female' if noko.text.include?('Señora') || noko.text.include?('Dõna')
      return 'male' if noko.text.include?('Señor')

      return
    end

    private

    def parts
      noko.text.tidy.gsub(/Iltma\.$/, '').split /(Excmo|Excma|Iltmo|Iltma|Señora|Señor)/
    end
  end

  class Members
    def member_container
      noko.css('.article_text p').select { |node| node.text.tidy =~ /^\d/ }
    end

    def member_items
      super.reject { |row| row.name[/^\d/] }
    end
  end
end

file = Pathname.new 'official.html'
puts EveryPoliticianScraper::FileData.new(file).csv if file.exist? && !file.empty?
