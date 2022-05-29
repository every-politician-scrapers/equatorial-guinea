#!/bin/env ruby
# frozen_string_literal: true

require 'every_politician_scraper/comparison'
require 'pry'

class Comparison < EveryPoliticianScraper::NulllessComparison
  def external
    super.delete_if { |row| row[:start] == row[:end] }
  end
end

diff = Comparison.new('wikidata.csv', 'scraped.csv').diff
puts diff.sort_by { |r| [r.first, r[1].to_s] }.reverse.map(&:to_csv)